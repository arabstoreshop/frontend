"use client";

import Script from "next/script";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;

// ─── Browser-side pixel event helpers ────────────────────────────────────────

interface PurchaseEventParams {
  eventId: string;
  value: number;
  currency: string;
  orderId: string;
  contentIds: string[];
}

export function trackPurchasePixel(params: PurchaseEventParams) {
  const { eventId, value, currency, orderId, contentIds } = params;

  // Meta Pixel — dedup via eventID matching server CAPI
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq(
      "track",
      "Purchase",
      { value, currency, order_id: orderId, content_ids: contentIds, content_type: "product" },
      { eventID: eventId }
    );
  }

  // TikTok Pixel — dedup via event_id
  if (typeof window !== "undefined" && (window as any).ttq) {
    (window as any).ttq.track("CompletePayment", {
      value,
      currency,
      order_id: orderId,
      content_id: contentIds,
      event_id: eventId,
    });
  }

  // Snap Pixel — dedup via client_dedup_id
  if (typeof window !== "undefined" && (window as any).snaptr) {
    (window as any).snaptr("track", "PURCHASE", {
      price: value,
      currency,
      transaction_id: orderId,
      client_dedup_id: eventId,
    });
  }
}

export function trackPageView() {
  if (typeof window === "undefined") return;
  if ((window as any).fbq) (window as any).fbq("track", "PageView");
  if ((window as any).ttq) (window as any).ttq.page();
  if ((window as any).snaptr) (window as any).snaptr("track", "PAGE_VIEW");
}

export function trackViewContent(params: { contentId: string; contentName: string; value?: number }) {
  if (typeof window === "undefined") return;
  if ((window as any).fbq) {
    (window as any).fbq("track", "ViewContent", {
      content_ids: [params.contentId],
      content_name: params.contentName,
      currency: "SAR",
      value: params.value ?? 199,
    });
  }
  if ((window as any).ttq) {
    (window as any).ttq.track("ViewContent", {
      content_id: [params.contentId],
      content_name: params.contentName,
    });
  }
}

export function trackInitiateCheckout(params: { value: number; contentIds: string[] }) {
  if (typeof window === "undefined") return;
  if ((window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout", {
      value: params.value,
      currency: "SAR",
      content_ids: params.contentIds,
    });
  }
  if ((window as any).ttq) {
    (window as any).ttq.track("InitiateCheckout", {
      value: params.value,
      currency: "SAR",
    });
  }
}

// ─── Script tags (deferred for performance) ──────────────────────────────────

export function PixelScripts() {
  return (
    <>
      {/* Meta Pixel */}
      {META_PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* TikTok Pixel */}
      {TIKTOK_PIXEL_ID && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {/* Snap Pixel */}
      {SNAP_PIXEL_ID && (
        <Script id="snap-pixel" strategy="afterInteractive">
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
            {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);})(window,document,
            'https://sc-static.net/scevent.min.js');
            snaptr('init', '${SNAP_PIXEL_ID}');
            snaptr('track', 'PAGE_VIEW');
          `}
        </Script>
      )}
    </>
  );
}
