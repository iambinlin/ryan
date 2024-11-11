/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare interface Window {
    gtag: (...params: unknown[]) => void;
}
