/**
 * Host half of dsh-550c-boot-deepseek.
 *
 * The animation lives in lib/client.js. Its first frame cannot: DSH's own
 * "Loading plugins…" card is painted before any client module is evaluated.
 * This half contributes one style row and one synchronous script row to every
 * served index, so the cover is on the glass while the document is still
 * parsing. The client retires it in the same task that mounts the shadow root.
 *
 * Deliberately small: no HTTP routes, no npm update check, no network. The
 * package is a local custom build and must never update itself over the
 * original dsh-550c-boot.
 *
 * @module dsh-550c-boot-deepseek
 */

import { readFileSync } from 'node:fs'

export const name = 'boot-550c-deepseek'

/** Keep in sync with lib/client.js MODE_KEY. */
const MODE_KEY = 'dsh-550c-boot-deepseek:mode'
/** Keep in sync with lib/client.js FIRST_FRAME_GLOBAL. */
const FIRST_FRAME_GLOBAL = '__dsdsFirstFrame'
/** Painted under the splash's own --bg, so the handoff is invisible. */
const FIRST_FRAME_BG = '#050403'
/** Absolute ceiling (ms): past this the cover yields whatever is on the page. */
const FIRST_FRAME_MAX_MS = 26000
/** The splash's own :host z-index (client HOST_CSS) minus one. */
const FIRST_FRAME_Z = 2147482000

function packageVersion() {
  try {
    const url = new URL('../package.json', import.meta.url)
    return JSON.parse(readFileSync(url, 'utf8')).version ?? null
  } catch {
    return null
  }
}

const VERSION = packageVersion()

const FIRST_FRAME_CSS =
  'html.deepseek-boot-first::before{content:"";position:fixed;inset:0;background:' +
  FIRST_FRAME_BG +
  ';z-index:' +
  String(FIRST_FRAME_Z) +
  ';pointer-events:none}\n' +
  'html.deepseek-boot-first{background:' +
  FIRST_FRAME_BG +
  ';--dsw-specific-sidebar-fill:#141008;--dsw-alias-label-primary:#e8a020}'

const FIRST_FRAME_SCRIPT =
  '(function(){' +
  'var mode=null;' +
  'try{mode=window.localStorage.getItem(' +
  JSON.stringify(MODE_KEY) +
  ')}catch(error){}' +
  'if(mode==="off")return;' +
  'var root=document.documentElement;' +
  'var watch=null;' +
  'var end=function(){' +
  'if(watch!==null){window.clearInterval(watch);watch=null}' +
  'root.classList.remove("deepseek-boot-first")' +
  '};' +
  'window.' +
  FIRST_FRAME_GLOBAL +
  '={end:end};' +
  'root.classList.add("deepseek-boot-first");' +
  'var seen=false;' +
  'watch=window.setInterval(function(){' +
  'var card=document.querySelector("[data-dsh-boot]");' +
  'if(card===null){if(seen)end();return}' +
  'seen=true;' +
  'if(card.querySelector("[data-dsh-boot-spinner]")===null)end()' +
  '},250);' +
  'window.setTimeout(end,' +
  String(FIRST_FRAME_MAX_MS) +
  ');' +
  '})()'

/**
 * Contribute the first-frame cover and the running version to the served page.
 * @param ctx - the plugin context.
 */
export function apply(ctx) {
  ctx.on('webserver/index-inject', (table) => {
    table.push({ kind: 'style', text: FIRST_FRAME_CSS })
    table.push({ kind: 'script', placement: 'head', text: FIRST_FRAME_SCRIPT })
    if (VERSION !== null) table.push({ kind: 'global', name: '__dsdsVersion', value: VERSION })
  })
}
