// scripts/notify-changelog.mjs
//
// Déclenché à chaque push sur `main`.
// 1. Détermine si le commit vient de l'éditeur de thème Shopify ou d'une PR mergée par un humain.
// 2. Récupère les fichiers modifiés.
// 3. Crée une entrée dans une base Notion.
// 4. Envoie une notification Slack (message différent selon la source).

import { execSync } from "node:child_process";

const {
    NOTION_API_KEY,
    NOTION_DATABASE_ID,
    SLACK_WEBHOOK_URL,
    GITHUB_REPOSITORY,
    COMMIT_SHA,
    COMMIT_MESSAGE = "",
    COMMIT_URL,
    COMMIT_AUTHOR_NAME = "",
    COMMIT_AUTHOR_EMAIL = "",
    COMMIT_TIMESTAMP,
} = process.env;

function fail(msg) {
    console.error(`❌ ${msg}`);
    process.exit(1);
}

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) fail("Secrets Notion manquants (NOTION_API_KEY / NOTION_DATABASE_ID).");
if (!SLACK_WEBHOOK_URL) fail("Secret SLACK_WEBHOOK_URL manquant.");

// --- 1. Détection de la source du commit -----------------------------------
//
// Les commits poussés par l'app Shopify (depuis l'éditeur de thème) ont un
// nom/email d'auteur reconnaissable. On matche sur "shopify" en minuscule.
// Ajuste ce filtre si besoin après avoir vérifié le nom exact dans tes logs
// de commit GitHub (Settings > Integrations, ou `git log` sur main).
const isShopifyEditor =
    /shopify/i.test(COMMIT_AUTHOR_NAME) || /shopify/i.test(COMMIT_AUTHOR_EMAIL);

// Si ce n'est pas Shopify, on essaie de récupérer le numéro de PR à partir
// du message de merge standard généré par GitHub ("Merge pull request #12 from ...")
const prMatch = COMMIT_MESSAGE.match(/Merge pull request #(\d+)/i);
const prNumber = prMatch ? prMatch[1] : null;

const source = isShopifyEditor ? "Shopify Editor" : "Pull Request";

// --- 2. Fichiers modifiés dans ce commit ------------------------------------
let changedFiles = [];
try {
    const diff = execSync(`git diff --name-only HEAD^ HEAD`, { encoding: "utf-8" });
    changedFiles = diff.split("\n").filter(Boolean);
} catch (e) {
    console.warn("Impossible de calculer le diff (probablement un premier commit).");
}

const shortSha = COMMIT_SHA.slice(0, 7);
const firstLine = COMMIT_MESSAGE.split("\n")[0];

// --- 3. Création de l'entrée dans Notion ------------------------------------
async function createNotionEntry() {
    const res = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            parent: { database_id: NOTION_DATABASE_ID },
            properties: {
                // Adapte ces noms de propriétés à ceux de ta base Notion.
                Nom: {
                    title: [{ text: { content: firstLine || `Commit ${shortSha}` } }],
                },
                Source: {
                    select: { name: source },
                },
                Auteur: {
                    rich_text: [{ text: { content: COMMIT_AUTHOR_NAME || "Inconnu" } }],
                },
                Fichiers: {
                    rich_text: [
                        {
                            text: {
                                content: changedFiles.length
                                    ? changedFiles.join(", ")
                                    : "Non détecté",
                            },
                        },
                    ],
                },
                Commit: {
                    url: COMMIT_URL,
                },
                ...(prNumber && {
                    PR: {
                        url: `https://github.com/${GITHUB_REPOSITORY}/pull/${prNumber}`,
                    },
                }),
                Date: {
                    date: { start: COMMIT_TIMESTAMP },
                },
            },
        }),
    });

    if (!res.ok) {
        const body = await res.text();
        fail(`Erreur Notion API (${res.status}): ${body}`);
    }
    console.log("Entrée Notion créée.");
}

// --- 4. Notification Slack --------------------------------------------------
async function notifySlack() {
    const emoji = isShopifyEditor ? "🎨" : "🔧";
    const label = isShopifyEditor
        ? "Modification via l'éditeur de thème Shopify"
        : `Déploiement via Pull Request${prNumber ? ` #${prNumber}` : ""}`;

    const filesText = changedFiles.length
        ? changedFiles.slice(0, 10).map((f) => `• \`${f}\``).join("\n") +
        (changedFiles.length > 10 ? `\n… et ${changedFiles.length - 10} autre(s)` : "")
        : "_Fichiers non détectés_";

    const payload = {
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `${emoji} *${label}*\n*Boutique :* boutique principale\n*Auteur :* ${COMMIT_AUTHOR_NAME || "Inconnu"}\n*Message :* ${firstLine}`,
                },
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*Fichiers modifiés :*\n${filesText}`,
                },
            },
            {
                type: "context",
                elements: [
                    {
                        type: "mrkdwn",
                        text: `<${COMMIT_URL}|Voir le commit ${shortSha}> sur \`${GITHUB_REPOSITORY}\``,
                    },
                ],
            },
        ],
    };

    const res = await fetch(SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const body = await res.text();
        fail(`Erreur Slack webhook (${res.status}): ${body}`);
    }
    console.log("Notification Slack envoyée.");
}

// --- Run ---------------------------------------------------------------------
await createNotionEntry();
await notifySlack();