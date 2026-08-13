
// const umaCornerWhenReady =
//   window?.CornerWebComponentsAPI?.whenReady?.call(window.CornerWebComponentsAPI) ||
//   new Promise(resolve => {
//     window.CORNER_PENDING_EXTENDED_COMPONENTS = window.CORNER_PENDING_EXTENDED_COMPONENTS || [];
//     window.CORNER_PENDING_EXTENDED_COMPONENTS.push(resolve);
//   });

// umaCornerWhenReady.then(() => {
//   window.CornerWebComponentsAPI.extendComponents({
//     CornerCartLineItem: BaseClass => {
//       return class extends BaseClass {
//         render() {
//           if (!this.item) {
//             return this.nothing;
//           }

//           try {
//             return this.html`
// 					<div
// 					  id="corner-cowi-cart-item-${this.index}"
// 					  data-testid="corner-cart-line"
// 					  data-corner-product-id=${this.item?.productId || ''}
// 					  data-corner-variant-id=${this.item?.variantId || ''}
// 					  data-product-type=${this.item?.productType || ''}
// 					  data-vendor=${this.item?.vendor || ''}
// 					  data-quantity=${this.item?.quantity || 0}
// 					  class=${this.classMap({
//               'corner-cowi-cart-item': true,
//               hidden: !this.shouldShowAll,
//             })}
// 					  role="listitem"
// 					  aria-label=${this.productTitle}
// 					>
// 					  <div
// 						id=${`corner-cowi-cart-item-primary-info-${this.index}`}
// 						data-testid="corner-cowi-cart-item-primary-info"
// 						class="corner-cowi-cart-item-primary-info flex items-stretch"
// 					  >
// 						<div
// 							id=${`corner-cowi-cart-item-list-item-image-${this.index}`}
// 							data-testid="corner-cowi-cart-item-list-item-image"
// 							class=${this.classMap({
//                 'w-16': true,
//                 'bg-cowi-card-bg': true,
//                 relative: true,
//                 'md:w-20': true,
//                 flex: true,
//                 'flex-wrap': true,
//                 'items-start': true,
//                 'flex-grow-0': true,
//                 'flex-shrink-0': true,
//                 'rounded-lg': true,
//                 invisible: !this.shouldShowImage,
//                 'pointer-events-none': !this.shouldShowImage,
//               })}
// 							title=${this.imageLabel}
// 							@click=${this.handleImageClick}
// 						  >
// 							${this.when(
//                 this.item?.image,
//                 () => {
//                   return this.html`
// 										<img
// 											data-testid="item-image"
// 											class="w-full relative z-10 object-cover rounded-lg"
// 											src=${this.item.image}
// 											alt=${this.item.productTitle + '-image'}
// 										/>
// 										`;
//                 },
//                 () => this.html`<div class="corner-no-image"></div>`,
//               )}
// 						  </div>
// 						<div
// 						  data-testid="corner-cowi-cart-item-list-item-info-body"
// 						  id="corner-cowi-cart-item-list-item-info-body-${this.index}"
// 						  class="corner-cowi-cart-item-list-item-info-body flex flex-col justify-between flex-grow ml-4"
// 						>
// 						  <div
// 							data-testid="corner-cowi-cart-item-list-item-info-title-wrapper"
// 							id="corner-cowi-cart-item-list-item-info-title-wrapper-${this.index}"
// 							class="corner-cowi-cart-item-list-item-info-title-wrapper flex items-start"
// 						  >
// 							<div class="grow">
// 							  ${this.html`
// 								<a data-testid="corner-cowi-cart-item-title-anchor"
// 								  href=${this.isTitleClickable ? this.item.url : '#'}
// 								  class=${this.classMap({
//                     'text-base': true,
//                     'font-bold': true,
//                     invisible: !this.shouldShowTitle,
//                     'pointer-events-none': !this.shouldShowTitle || !this.isTitleClickable,
//                   })}>
// 								  <p 
// 									class="text-md leading-snug text-cowi-primary-type hover:text-[color:var(--corner-cowi-accent-bg)] transition-all">
// 									${this.truncatedTitle}
// 								  </p>
// 								</a>
// 							  `}
	
	
// 							  ${this.when(this.item?.properties?._Fréquence, () => {
//                   return this.html`
// 										<p class="text-md leading-snug text-cowi-primary-type hover:text-[color:var(--corner-cowi-accent-bg)] transition-all" style="color: #322B81; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important; font-size: clamp(10px, 1.2vw, 14px); font-style: normal; font-weight: 400; line-height: normal !important;">
// 										${this.item?.properties?._Fréquence}
// 										</p>`;
//                 })}
	
// 							  ${this.when(
//                   this.hasVariantOptions,
//                   () => this.html`
// 											<div
// 												id="corner-cowi-cart-item-variant-options-${this.index}"
// 												class=${this.classMap({
//                           'corner-cowi-cart-item-variant-options': true,
//                           'text-sm': true,
//                           'leading-0': true,
//                           'text-cowi-secondary-type': true,
//                           'mt-2': true,
//                           invisible: !this.shouldShowOptions,
//                           'pointer-events-none': !this.shouldShowOptions,
//                         })}
// 									aria-label="Product variant options"
// 									  >
// 										${this.map(this.variantOptions, (option, index) => {
//                       return this.when(
//                         option && option !== 'Default Title',
//                         () => this.html`
// 															${index !== this.variantOptions.length - 1 ? `${option} •` : ` ${option}`}
// 															`,
//                         () => this.nothing,
//                       );
//                     })}
// 								  </div>
// 								`,
//                 )}
// 							  <div
// 								id="corner-cowi-cart-item-line-properties-${this.index}"
// 								class="corner-cowi-cart-item-line-properties text-xs flex flex-wrap leading-0 text-cowi-secondary-type"
// 							  >
// 								${this.when(
//                   this.sellingPlanName,
//                   () => this.html`
// 												<div
// 												id="corner-cowi-cart-item-selling-plan-${this.index}"
// 												class=${this.classMap({
//                           'corner-cowi-cart-item-selling-plan': true,
//                           'px-2': true,
//                           'font-bold': true,
//                           'leading-0': true,
//                           'text-cowi-secondary-type': true,
//                           'mr-1': true,
//                           'mt-1': true,
//                           'rounded-lg': true,
//                           border: true,
//                           'border-solid': true,
//                           'border-cowi-outlines': true,
//                           'max-w-fit': true,
//                           invisible: !this.shouldShowSellingPlans,
//                           'pointer-events-none': !this.shouldShowSellingPlans,
//                         })}
// 												>
// 									  <span> ${this.sellingPlanName} </span>
// 									</div>
// 								  `,
//                 )}
// 								${this.when(
//                   this.hasRechargePlan,
//                   () => this.html`
// 												<div
// 												id="corner-cowi-cart-item-recharge-plan-description-${this.index}"
// 												class="corner-cowi-cart-item-recharge-plan-description px-2 font-bold leading-0 text-cowi-secondary-type mr-1 mt-1 rounded-lg border border-solid border-cowi-outlines max-w-fit"
// 												>
// 												<span>
// 													${this.renderRechargeShippingFrequency(
//                             this.item?.properties?.[
//                               CornerCartLineCore.PROPERTY_KEYS.SHIPPING_INTERVAL_FREQUENCY
//                             ],
//                             this.item?.properties?.[
//                               CornerCartLineCore.PROPERTY_KEYS.SHIPPING_INTERVAL_UNIT
//                             ],
//                           )}
// 												</span>
// 												</div>
// 											`,
//                 )}
// 								${this.when(this.shouldRenderItemProperties, () => {
//                   return this.map(this.filteredPropertyKeys, key => {
//                     const value = this.item?.properties?.[key];
//                     return this.when(
//                       this.isUrl(this.item?.properties?.[key]),
//                       () => this.html`
// 													<div
// 													id=${key}
// 													class="shrink-0 border border-cowi-outlines border-solid px-1 mr-1 mt-1 rounded-lg max-w-full"
// 													>
// 													<div class="flex items-center break-all">
// 														<span>${key}:</span>
// 														<a
// 														href=${value}
// 														target="_blank"
// 														class="font-bold w-5 h-5 mx-1"
// 														>
// 														<corner-icon
// 															type="link"
// 															.color=${this.secondaryColor}
// 														></corner-icon>
// 														</a>
// 													</div>
// 													</div>
// 												`,
//                       () =>
//                         this.html`
// 														<div
// 														class="shrink-0 border border-cowi-outlines border-solid px-1 mr-1 mt-1 rounded-lg max-w-full"
// 														>
// 														<div class="break-all">
// 															<span>${key}:</span>
// 															<span class="font-bold"
// 															>${value}</span
// 															>
// 														</div>
// 														</div>
// 													`,
//                     );
//                   });
//                 })}
// 										</div>
// 										</div>
// 										${this.html`
// 										<div
// 											data-testid="corner-cowi-cart-item-list-item-info-remove-btn"
// 											id="corner-cowi-cart-item-list-item-info-remove-btn-${this.index}"
// 										class=${this.classMap({
//                       'corner-cowi-cart-item-list-item-info-remove-btn': true,
//                       'w-5': true,
//                       'h-5': true,
//                       'p-[4px]': true,
//                       'shrink-0': true,
//                       'rounded-full': true,
//                       'transition-all': true,
//                       'opacity-50': true,
//                       'cursor-pointer': true,
//                       'hover:rotate-90': true,
//                       'hover:opacity-100': true,
//                       'mt-1': true,
//                       'pointer-events-none': !this.shouldShowCloseButton || this.isLoading,
//                       invisible: !this.shouldShowCloseButton,
//                     })}
// 								@click=${this.handleItemRemove}
// 								title=${this.removeButtonLabel}
// 							  >
// 								<corner-icon
// 								  data-testid="corner-cowi-cart-item-list-item-info-remove-icon"
// 								  type="close-cross"
// 								  .color=${this.secondaryColor}
// 								></corner-icon>
// 							  </div>
// 							`}
// 						  </div>
// 						  ${this.when(this.lineItemMessages && this.lineItemMessages.length, () => {
//                 return this.html`
// 										<corner-cart-line-messages
// 											.lineItemMessages=${this.lineItemMessages}
// 											.index=${this.index}
// 										>
// 										</corner-cart-line-messages>`;
//               })}
// 									<div
// 										id="corner-cowi-cart-item-customiser-${this.index}"
// 										class=${this.classMap({
//                       'corner-cowi-cart-item-customise': true,
//                       flex: true,
//                       'mt-3': true,
//                       'items-center': true,
//                       'justify-end': this.isQtyHidden,
//                       'justify-between': !this.isQtyHidden,
//                     })}
// 							>
// 								${this.html`
// 								<corner-qty-control
// 									class="block"
// 								  .index=${this.index}
// 								  .item=${this.item}
// 								  .quantity=${this.quantity}
// 								  .hidden=${this.isQtyHidden}
// 								  .globalContext=${this.globalContext}
// 								  .isLoading=${this.isLoading}
// 								  .isCartLoading=${this.isCartLoading}
// 								>
// 								</corner-qty-control>
// 							`}
							
//                             ${this.when(
//                               !this.item?.sellingPlanAllocation?.compare_at_price,
//                               () => this.html`
//       <corner-price-text 
//         .item=${this.item}
//         .index=${this.index}
//         .finalPrice=${this.finalPriceFormatted}
//         .strikedPrice=${this.strikedPriceFormatted}
//         .hidePrice=${!this.shouldShowPrice}
//         .hideStrikedPrice=${!this.shouldShowStrikedPrice}
//         .freeText=${this.freeText}
//         .fallBackPrice=${this.fallBackPrice}
//         .isLoading=${this.isLoading}
//         .loaderColor=${this.primaryColor}
//         .isFreeProduct=${this.isFreeProduct}
//       ></corner-price-text>
//     `,

//                               () => {
//                                 const originalTotal = this.item.properties._Prix_original;
//                                 const finalTotal = this.item.properties._Prix_final;
//                                 const discountPercentage = this.item.properties._Réduction;

//                                 return this.html`
//         <span class="corner-subscription-price-wrapper">
//           <span class="corner-subscription-price-content">
//             <span class="corner-subscription-price-original">
//               ${originalTotal}
//             </span>
//             <span class="corner-subscription-price-final">
//               ${finalTotal}
//             </span>
//           </span>

//           <div
//             style="
//               background: #ffc008;
//               border-radius: 5px;
//               padding: 4px 5px;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               flex-shrink: 0;
//             "
//           >
//             <div
//               style="
//                 color: #322b81;
//                 font-size: 10px;
//                 line-height: 100%;
//                 font-weight: 700;
//               "
//             >
//               -${discountPercentage}
//             </div>
//           </div>
//         </span>
//       `;
//                               },
//                             )}



//   ${this.when(
//     !this.item?.sellingPlanAllocation?.compare_at_price && this.item?.discounts?.[0]?.title,
//     () => {
//       const title = String(this.item.discounts[0].title || '');
//       const match = title.match(/-?\d+%/);
//       const discountText = match ? match[0] : title;

//       return this.html`
//         <div class="text-xs mr-1 ml-3 bg-cowi-secondary-bg px-2 py-1 my-1 rounded-md flex items-center text-cowi-primary-type font-bold">
//           <span class="font-bold w-5 h-5 mr-1">
//             <corner-icon type="tag"></corner-icon>
//           </span> 
//           <span>${discountText}</span>
//         </div>
//       `;
//     },
//   )}
// 						  </div>
// 						</div>
// 					  </div>
// 					</div>
// 				  `;
//           } catch (error) {
//             console.error('Error rendering cart item:', error);
//             return this.nothing;
//           }
//         }
//       };
//     },
//     CornerCartSellingPlanSelect: BaseClass => {
//       return class extends BaseClass {
//         render() {
//           return this.nothing;
//         }
//       };
//     },
//   });
// });





const umaCornerWhenReady =
  window?.CornerWebComponentsAPI?.whenReady?.call(window.CornerWebComponentsAPI) ||
  new Promise(resolve => {
    window.CORNER_PENDING_EXTENDED_COMPONENTS = window.CORNER_PENDING_EXTENDED_COMPONENTS || [];
    window.CORNER_PENDING_EXTENDED_COMPONENTS.push(resolve);
  });

umaCornerWhenReady.then(() => {
  window.CornerWebComponentsAPI.extendComponents({
    CornerCartLineItem: BaseClass => {
      return class extends BaseClass {
        render() {
          if (!this.item) {
            return this.nothing;
          }

          try {
            return this.html`
					<div
					  id="corner-cowi-cart-item-${this.index}"
					  data-testid="corner-cart-line"
					  data-corner-product-id=${this.item?.productId || ''}
					  data-corner-variant-id=${this.item?.variantId || ''}
					  data-product-type=${this.item?.productType || ''}
					  data-vendor=${this.item?.vendor || ''}
					  data-quantity=${this.item?.quantity || 0}
					  class=${this.classMap({
              'corner-cowi-cart-item': true,
              hidden: !this.shouldShowAll,
            })}
					  role="listitem"
					  aria-label=${this.productTitle}
					>
					  <div
						id=${`corner-cowi-cart-item-primary-info-${this.index}`}
						data-testid="corner-cowi-cart-item-primary-info"
						class="corner-cowi-cart-item-primary-info flex items-stretch"
					  >
						<div
							id=${`corner-cowi-cart-item-list-item-image-${this.index}`}
							data-testid="corner-cowi-cart-item-list-item-image"
							class=${this.classMap({
                'w-16': true,
                'bg-cowi-card-bg': true,
                relative: true,
                'md:w-20': true,
                flex: true,
                'flex-wrap': true,
                'items-start': true,
                'flex-grow-0': true,
                'flex-shrink-0': true,
                'rounded-lg': true,
                invisible: !this.shouldShowImage,
                'pointer-events-none': !this.shouldShowImage,
              })}
							title=${this.imageLabel}
							@click=${this.handleImageClick}
						  >
							${this.when(
                this.item?.image,
                () => {
                  return this.html`
										<img
											data-testid="item-image"
											class="w-full relative z-10 object-cover rounded-lg"
											src=${this.item.image}
											alt=${this.item.productTitle + '-image'}
										/>
										`;
                },
                () => this.html`<div class="corner-no-image"></div>`,
              )}
						  </div>
						<div
						  data-testid="corner-cowi-cart-item-list-item-info-body"
						  id="corner-cowi-cart-item-list-item-info-body-${this.index}"
						  class="corner-cowi-cart-item-list-item-info-body flex flex-col justify-between flex-grow ml-4"
						>
						  <div
							data-testid="corner-cowi-cart-item-list-item-info-title-wrapper"
							id="corner-cowi-cart-item-list-item-info-title-wrapper-${this.index}"
							class="corner-cowi-cart-item-list-item-info-title-wrapper flex items-start"
						  >
							<div class="grow">
							  ${this.html`
								<a data-testid="corner-cowi-cart-item-title-anchor"
								  href=${this.isTitleClickable ? this.item.url : '#'}
								  class=${this.classMap({
                    'text-base': true,
                    'font-bold': true,
                    invisible: !this.shouldShowTitle,
                    'pointer-events-none': !this.shouldShowTitle || !this.isTitleClickable,
                  })}>
								  <p 
									class="text-md leading-snug text-cowi-primary-type hover:text-[color:var(--corner-cowi-accent-bg)] transition-all">
									${this.truncatedTitle}
								  </p>
								</a>
							  `}
	
	
							  ${this.when(this.item?.properties?._Fréquence, () => {
                  return this.html`
										<p class="text-md leading-snug text-cowi-primary-type hover:text-[color:var(--corner-cowi-accent-bg)] transition-all" style="color: #322B81; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important; font-size: clamp(10px, 1.2vw, 14px); font-style: normal; font-weight: 400; line-height: normal !important;">
										${this.item?.properties?._Fréquence}
										</p>`;
                })}

                ${this.when(
                  !this.item?.properties?._Fréquence &&
                    this.item?.sellingPlanAllocation?.selling_plan?.name,
                  () => {
                    return this.html`
										<p class="text-md leading-snug text-cowi-primary-type hover:text-[color:var(--corner-cowi-accent-bg)] transition-all" style="color: #322B81; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important; font-size: clamp(10px, 1.2vw, 14px); font-style: normal; font-weight: 400; line-height: normal !important;">
										${this.item?.sellingPlanAllocation?.selling_plan?.name}
										</p>`;
                  },
                )}
	
							  ${this.when(
                  this.hasVariantOptions,
                  () => this.html`
											<div
												id="corner-cowi-cart-item-variant-options-${this.index}"
												class=${this.classMap({
                          'corner-cowi-cart-item-variant-options': true,
                          'text-sm': true,
                          'leading-0': true,
                          'text-cowi-secondary-type': true,
                          'mt-2': true,
                          invisible: !this.shouldShowOptions,
                          'pointer-events-none': !this.shouldShowOptions,
                        })}
									aria-label="Product variant options"
									  >
										${this.map(this.variantOptions, (option, index) => {
                      return this.when(
                        option && option !== 'Default Title',
                        () => this.html`
															${index !== this.variantOptions.length - 1 ? `${option} •` : ` ${option}`}
															`,
                        () => this.nothing,
                      );
                    })}
								  </div>
								`,
                )}
							  <div
								id="corner-cowi-cart-item-line-properties-${this.index}"
								class="corner-cowi-cart-item-line-properties text-xs flex flex-wrap leading-0 text-cowi-secondary-type"
							  >
								${this.when(
                  this.sellingPlanName,
                  () => this.html`
												<div
												id="corner-cowi-cart-item-selling-plan-${this.index}"
												class=${this.classMap({
                          'corner-cowi-cart-item-selling-plan': true,
                          'px-2': true,
                          'font-bold': true,
                          'leading-0': true,
                          'text-cowi-secondary-type': true,
                          'mr-1': true,
                          'mt-1': true,
                          'rounded-lg': true,
                          border: true,
                          'border-solid': true,
                          'border-cowi-outlines': true,
                          'max-w-fit': true,
                          invisible: !this.shouldShowSellingPlans,
                          'pointer-events-none': !this.shouldShowSellingPlans,
                        })}
												>
									  <span> ${this.sellingPlanName} </span>
									</div>
								  `,
                )}
								${this.when(
                  this.hasRechargePlan,
                  () => this.html`
												<div
												id="corner-cowi-cart-item-recharge-plan-description-${this.index}"
												class="corner-cowi-cart-item-recharge-plan-description px-2 font-bold leading-0 text-cowi-secondary-type mr-1 mt-1 rounded-lg border border-solid border-cowi-outlines max-w-fit"
												>
												<span>
													${this.renderRechargeShippingFrequency(
                            this.item?.properties?.[
                              CornerCartLineCore.PROPERTY_KEYS.SHIPPING_INTERVAL_FREQUENCY
                            ],
                            this.item?.properties?.[
                              CornerCartLineCore.PROPERTY_KEYS.SHIPPING_INTERVAL_UNIT
                            ],
                          )}
												</span>
												</div>
											`,
                )}
								${this.when(this.shouldRenderItemProperties, () => {
                  return this.map(this.filteredPropertyKeys, key => {
                    const value = this.item?.properties?.[key];
                    return this.when(
                      this.isUrl(this.item?.properties?.[key]),
                      () => this.html`
													<div
													id=${key}
													class="shrink-0 border border-cowi-outlines border-solid px-1 mr-1 mt-1 rounded-lg max-w-full"
													>
													<div class="flex items-center break-all">
														<span>${key}:</span>
														<a
														href=${value}
														target="_blank"
														class="font-bold w-5 h-5 mx-1"
														>
														<corner-icon
															type="link"
															.color=${this.secondaryColor}
														></corner-icon>
														</a>
													</div>
													</div>
												`,
                      () =>
                        this.html`
														<div
														class="shrink-0 border border-cowi-outlines border-solid px-1 mr-1 mt-1 rounded-lg max-w-full"
														>
														<div class="break-all">
															<span>${key}:</span>
															<span class="font-bold"
															>${value}</span
															>
														</div>
														</div>
													`,
                    );
                  });
                })}
										</div>
										</div>
										${this.html`
										<div
											data-testid="corner-cowi-cart-item-list-item-info-remove-btn"
											id="corner-cowi-cart-item-list-item-info-remove-btn-${this.index}"
										class=${this.classMap({
                      'corner-cowi-cart-item-list-item-info-remove-btn': true,
                      'w-5': true,
                      'h-5': true,
                      'p-[4px]': true,
                      'shrink-0': true,
                      'rounded-full': true,
                      'transition-all': true,
                      'opacity-50': true,
                      'cursor-pointer': true,
                      'hover:rotate-90': true,
                      'hover:opacity-100': true,
                      'mt-1': true,
                      'pointer-events-none': !this.shouldShowCloseButton || this.isLoading,
                      invisible: !this.shouldShowCloseButton,
                    })}
								@click=${this.handleItemRemove}
								title=${this.removeButtonLabel}
							  >
								<corner-icon
								  data-testid="corner-cowi-cart-item-list-item-info-remove-icon"
								  type="close-cross"
								  .color=${this.secondaryColor}
								></corner-icon>
							  </div>
							`}
						  </div>
						  ${this.when(this.lineItemMessages && this.lineItemMessages.length, () => {
                return this.html`
										<corner-cart-line-messages
											.lineItemMessages=${this.lineItemMessages}
											.index=${this.index}
										>
										</corner-cart-line-messages>`;
              })}
									<div
										id="corner-cowi-cart-item-customiser-${this.index}"
										class=${this.classMap({
                      'corner-cowi-cart-item-customise': true,
                      flex: true,
                      'mt-3': true,
                      'items-center': true,
                      'justify-end': this.isQtyHidden,
                      'justify-between': !this.isQtyHidden,
                    })}
							>
								${this.html`
								<corner-qty-control
									class="block"
								  .index=${this.index}
								  .item=${this.item}
								  .quantity=${this.quantity}
								  .hidden=${this.isQtyHidden}
								  .globalContext=${this.globalContext}
								  .isLoading=${this.isLoading}
								  .isCartLoading=${this.isCartLoading}
								>
								</corner-qty-control>
							`}
							
                            ${this.when(
                              !this.item?.sellingPlanAllocation?.compare_at_price,
                              () => this.html`
                                      <corner-price-text 
                                        .item=${this.item}
                                        .index=${this.index}
                                        .finalPrice=${this.finalPriceFormatted}
                                        .strikedPrice=${this.strikedPriceFormatted}
                                        .hidePrice=${!this.shouldShowPrice}
                                        .hideStrikedPrice=${!this.shouldShowStrikedPrice}
                                        .freeText=${this.freeText}
                                        .fallBackPrice=${this.fallBackPrice}
                                        .isLoading=${this.isLoading}
                                        .loaderColor=${this.primaryColor}
                                        .isFreeProduct=${this.isFreeProduct}
                                      ></corner-price-text>
                                    `,

                              () => {
                                const originalTotal =
                                  this.item.properties._Prix_original || this.strikedPriceFormatted;
                                const finalTotal =
                                  this.item.properties._Prix_final || this.finalPriceFormatted;
                                const discountPercentage = this.item.properties._Réduction;

                                const compareAtPrice =
                                  this.item?.sellingPlanAllocation?.compare_at_price || 0;
                                const finalPrice = this.item?.sellingPlanAllocation?.price || 0;
                                const calculatedDiscountPercentage =
                                  compareAtPrice > 0
                                    ? Math.round(
                                        ((compareAtPrice - finalPrice) / compareAtPrice) * 100,
                                      ) + '%'
                                    : discountPercentage;

                                return this.html`
                                          <span class="corner-subscription-price-wrapper">
                                            <span class="corner-subscription-price-content">
                                              <span class="corner-subscription-price-original text-xs md:text-sm text-cowi-secondary line-through mr-2"
                aria-label="Original price">
                                                ${originalTotal}
                                              </span>
                                              <span  class=${this.classMap({
                'text-xs': true,
                'md:text-sm':true,
                'md:text-base': true,
                'text-cowi-primary-type': true,
                'text-center': true,
                'font-bold': true,
                'px-3': this.isFreeProduct,
                'bg-cowi-secondary-bg': this.isFreeProduct,
                'rounded-full': this.isFreeProduct,
                'corner-subscription-price-final':true,
              })}
              aria-label=${this.isFreeProduct ? 'Free item' : 'Current price'}>
                                                ${finalTotal}
                                              </span>
                                            </span>
                                  
                                           
                                              
                                              <div class="text-xs mr-1 ml-3 bg-cowi-secondary-bg px-2 py-1 my-1 rounded-md flex items-center text-cowi-primary-type font-bold">
                                               <span class="font-bold w-5 h-5 mr-1">
                                                 <corner-icon type="tag"></corner-icon>
                                               </span> 
                                               <span>
                                               ${discountPercentage || calculatedDiscountPercentage}
                                               </span>
                                              </div>
                                           
                                          </span>
                                        `;
                              },
                            )}



                ${this.when(
                  !this.item?.sellingPlanAllocation?.compare_at_price &&
                    this.item?.discounts?.[0]?.title,
                  () => {
                    const title = String(this.item.discounts[0].title || '');
                    const match = title.match(/-?\d+%/);
                    const discountText = match ? match[0] : title;

                    return this.html`
                      <div class="text-xs mr-1 ml-3 bg-cowi-secondary-bg px-2 py-1 my-1 rounded-md flex items-center text-cowi-primary-type font-bold">
                        <span class="font-bold w-5 h-5 mr-1">
                          <corner-icon type="tag"></corner-icon>
                        </span> 
                        <span>${discountText}</span>
                      </div>
                    `;
                  },
                )}

						  </div>
						</div>
					  </div>
					</div>
				  `;
          } catch (error) {
            console.error('Error rendering cart item:', error);
            return this.nothing;
          }
        }
      };
    },
    CornerCartSellingPlanSelect: BaseClass => {
      return class extends BaseClass {
        render() {
          return this.nothing;
        }
      };
    },
  });
});

