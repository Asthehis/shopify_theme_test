if (!customElements.get('x-sticky-atc-bar')) {
  customElements.define(
    'x-sticky-atc-bar',
    class StickyAtcBar extends HTMLElement {
      constructor() {
        super();
        document.body.classList.add('sticky-atc-bar-enabled');
      }

      connectedCallback() {
        this.container = this.closest('.x-sticky-atc');
        this.stickyAtcBlock = this.closest('.x-extension\\:sticky-atc-block');

        const foxifyWrappers = [...document.querySelectorAll('.x-main')].filter(
          (wrapper) => wrapper.id !== 'x-Age-Verifier-Modal' && !wrapper.closest('.shopify-section-group-foxify-header-group'),
        );
        const mainContentWrapperCandidates = [...document.querySelectorAll('#MainContent .x-app.x-main')];
        const mainContentWrapper = mainContentWrapperCandidates.find((wrapper) => !wrapper.closest('.shopify-section-group-foxify-header-group'));
        const foxifyWrapper = mainContentWrapper || foxifyWrappers[0];
        if (this.stickyAtcBlock && foxifyWrapper && ![...foxifyWrapper.children].includes(this.stickyAtcBlock)) {
          foxifyWrapper.appendChild(this.stickyAtcBlock);
        }

        if (this.querySelector('template') && !this.dataset.initialized) {
          const content = this.querySelector('template').content?.firstElementChild?.cloneNode(true);
          this.innerHTML = content.innerHTML;
          this.dataset.initialized = 'true';
          this.init();
        }
      }

      init() {
        (async () => {
          const productJson = await window.Foxify.Utils.fetchJSON(`/products/${this.dataset.productHandle}.js`);
          this.variantJson = productJson.variants;
        })();

        this.submitButton = this.querySelector('.x-button[name="add"]');
        this.shopifyButton = this.querySelector('.shopify-payment-button');
        this.variantInput = this.querySelector('[name="id"]');
        this.productId = this.dataset.productId;
        this.isSyncingVariant = false;

        const isMobile = window.matchMedia('(max-width: 639px)');
        isMobile.addEventListener('change', this.checkDevice.bind(this));
        // Initial check
        this.checkDevice(isMobile);
        const showEarlyPx = Number(this.stickyAtcBlock?.dataset.showEarlyPx) || 0;
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const method = entry.isIntersecting ? 'remove' : 'add';
              this.container.classList[method]('x-sticky-atc--show');
            });
          },
          {
            threshold: [0, 1],
            rootMargin: `-${showEarlyPx}px 0px 0px 0px`,
          },
        );

        if (this.dataset.selectedVariantAvailable !== 'true') {
          if (this.submitButton) this.submitButton.setAttribute('disabled', 'true');
          if (this.shopifyButton) this.shopifyButton.setAttribute('disabled', 'true');
        }

        this.setObserveTarget();
        this.syncWithMainProductForm();
        this.variantInput.addEventListener('change', this.onVariantChange.bind(this));
      }

      setObserveTarget = () => {
        if (this.observeTarget) {
          this.observer.unobserve(this.observeTarget);
        }

        this.observeTarget =
          document.querySelector('.x-main-product .x-main-product__form [name="add"]') ||
          document.querySelector('.x-main-product .x-main-product__form');

        if (this.observeTarget) {
          this.observer.observe(this.observeTarget);
        }
      };

      checkDevice(_e) {
        const sectionHeight = this.clientHeight + 'px';
        document.documentElement.style.setProperty('--x-sticky-atc-bar-height', sectionHeight);
      }

      onVariantChange(event) {
        const shouldEmit = !this.isSyncingVariant;
        this.isSyncingVariant = false;
        const variantId = event.target.value;
        const btnLabel = this.submitButton?.querySelector('.x-btn__label');

        this.selectedVariant = this.variantJson.find((variant) => variant.id === Number(variantId));
        if (this.selectedVariant) {
          this.variantInput.value = this.selectedVariant.id;
          if (this.selectedVariant.available) {
            if (this.submitButton) this.submitButton.removeAttribute('disabled');
            if (this.shopifyButton) this.shopifyButton.removeAttribute('disabled');
            if (btnLabel) btnLabel.textContent = window.Foxify.Strings.addToCart;
          } else {
            if (this.submitButton) this.submitButton.setAttribute('disabled', 'true');
            if (this.shopifyButton) this.shopifyButton.setAttribute('disabled', 'true');
            if (btnLabel) btnLabel.textContent = window.Foxify.Strings.soldOut;
          }
          this.updatePrice();
          if (shouldEmit && window.Foxify && window.Foxify.Events) {
            window.Foxify.Events.emit(`${this.productId}__VARIANT_CHANGE`, this.selectedVariant, this);
          }
        }
      }

      updatePrice() {
        const variant = this.selectedVariant;

        const classes = {
          onSale: 'x-price--on-sale',
          soldOut: 'x-price--sold-out',
          hide: 'x-hidden',
          visibilityHidden: 'x-visibility-hidden',
        };
        const selectors = {
          priceWrapper: '.x-price',
          salePrice: '.x-price-item--sale',
          compareAtPrice: ['.x-price-item--regular'],
          unitPrice: '.x-price__unit',
          saleBadge: '.x-price__badge-sale',
          saleAmount: '[data-sale-value]',
        };
        const { money_format } = window.Foxify.Settings;
        const { priceWrapper, salePrice, compareAtPrice } = window.Foxify.Utils.queryDomNodes(selectors, this);

        const { compare_at_price, price } = variant;

        const onSale = compare_at_price && compare_at_price > price;
        const soldOut = !variant.available;

        if (onSale) {
          priceWrapper.classList.add(classes.onSale);
        } else {
          priceWrapper.classList.remove(classes.onSale);
        }

        if (soldOut) {
          priceWrapper.classList.add(classes.soldOut);
        } else {
          priceWrapper.classList.remove(classes.soldOut);
        }

        if (priceWrapper) priceWrapper.classList.remove(classes.visibilityHidden);
        if (salePrice) salePrice.innerHTML = window.Foxify.Utils.formatMoney(price, money_format);

        if (compareAtPrice && compareAtPrice.length && compare_at_price > price) {
          compareAtPrice.forEach((item) => (item.innerHTML = window.Foxify.Utils.formatMoney(compare_at_price, money_format)));
        } else {
          compareAtPrice.forEach((item) => (item.innerHTML = window.Foxify.Utils.formatMoney(price, money_format)));
        }
      }

      syncWithMainProductForm() {
        const btnLabel = this.submitButton?.querySelector('.x-btn__label');
        window.Foxify.Events.subscribe(`${this.productId}__VARIANT_CHANGE`, async (variant, source) => {
          if (source === this) return;

          if (!variant) {
            if (btnLabel) btnLabel.textContent = window.Foxify.Strings.unavailable;
            if (this.submitButton) this.submitButton.setAttribute('disabled', 'true');
            if (this.shopifyButton) this.shopifyButton.setAttribute('disabled', 'true');
            return;
          }

          if (Number(this.variantInput?.value) === variant.id) return;

          this.isSyncingVariant = true;
          this.variantInput.value = variant.id;
          this.variantInput.dispatchEvent(new Event('change'));
        });
      }
    },
  );
}
