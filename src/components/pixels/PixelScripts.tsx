"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

import { fetchPublicPixels, type PublicPixels } from "@/lib/api";

const FALLBACK: PublicPixels = {
  meta_pixel_id: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  tiktok_pixel_id: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "",
  snap_pixel_id: process.env.NEXT_PUBLIC_SNAP_PIXEL_ID || "",
};

interface PurchaseEventParams {
  eventId: string;
  value: number;
  currency: string;
  orderId: string;
  contentIds: string[];
}

export function trackPurchasePixel(params: PurchaseEventParams) {
  const { eventId, value, currency, orderId, contentIds } = params;

  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq(
      "track",
      "Purchase",
      { value, currency, order_id: orderId, content_ids: contentIds, content_type: "product" },
      { eventID: eventId }
    );
  }

  if (typeof window !== "undefined" && (window as any).ttq) {
    (window as any).ttq.track("CompletePayment", {
      value,
      currency,
      order_id: orderId,
      content_id: contentIds,
      event_id: eventId,
    });
  }

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

function safePixelId(id: string) {
  return /^[A-Za-z0-9._-]+$/.test(id) ? id : "";
}

export function PixelScripts() {
  const [pixels, setPixels] = useState<PublicPixels>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetchPublicPixels().then((ids) => {
      if (!cancelled) {
        setPixels({
          meta_pixel_id: ids.meta_pixel_id || FALLBACK.meta_pixel_id,
          tiktok_pixel_id: ids.tiktok_pixel_id || FALLBACK.tiktok_pixel_id,
          snap_pixel_id: ids.snap_pixel_id || FALLBACK.snap_pixel_id,
        });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const meta = safePixelId(pixels.meta_pixel_id);
  const tiktok = safePixelId(pixels.tiktok_pixel_id);
  const snap = safePixelId(pixels.snap_pixel_id);

  if (!meta && !tiktok && !snap) return null;

  return (
    <>
      {meta && (
        <>
          <Script id="meta-pixel" strategy="lazyOnload">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${meta}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${meta}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {tiktok && (
        <Script id="tiktok-pixel" strategy="lazyOnload">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('${tiktok}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {snap && (
        <Script id="snap-pixel" strategy="lazyOnload">
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
            {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);})(window,document,
            'https://sc-static.net/scevent.min.js');
            snaptr('init', '${snap}');
            snaptr('track', 'PAGE_VIEW');
          `}
        </Script>
      )}
    </>
  );
}
