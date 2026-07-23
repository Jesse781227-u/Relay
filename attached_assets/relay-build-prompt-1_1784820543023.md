# Relay — Mobile-First Small Business Operating System
## Full Build Prompt: Product, Design System & Architecture Specification

---

## 0. How to Use This Document

This is a build-ready prompt for an AI coding tool (Claude Code, Figma-to-code pipeline, or a human dev team) to design and build **Relay** end to end. It combines:

- The original product brief (CRM + Social Distribution + Ecommerce, mobile-first)
- A design system reverse-engineered from a reference UI kit (GrowSphere-style CRM screens) so the app doesn't ship with generic defaults
- Concrete screen specs, component contracts, data model, and technical architecture

Treat Section 2 (Design System) as law for every screen you build. Treat Section 4 (Screen Specs) as the scope of work — this includes the three marketed pillars (CRM, Marketing, Commerce) plus the cross-cutting "glue" screens (Business Settings, Notifications, Search, Reports, Goals, and more) that make Relay feel like a finished operating system rather than a set of disconnected features. Section 6 (Architecture) is the implementation backbone.

---

## 1. Product Positioning

**One-liner:** Relay is WhatsApp Business + Shopify + a social scheduler + a lightweight CRM, fused into one app-like dashboard for non-technical small business owners.

**Design philosophy:** Everything a small business owner needs, without the complexity of enterprise software.

**Target users:** Restaurants, salons, retail shops, barbers, fashion brands, event businesses, service providers, local stores — mobile-first, low technical literacy, using this primarily on a phone between customers.

**Non-negotiables:**
- Every core action reachable in 2–3 taps
- Cards, not tables
- Plain language, not analytics jargon ("How customers find you," not "Customer Acquisition Conversion Funnel Analytics")
- Feels like a native app — no desktop-SaaS chrome, no dense sidebars

---

## 2. Design System (extracted from reference kit)

The reference screens share a consistent kit language. Codify it as design tokens before writing a single component.

### 2.1 Color Tokens

```
--color-ink:            #16213E   /* primary CTA buttons, headline text, nav active state base */
--color-ink-2:          #1B2942   /* secondary dark surface (e.g. stat cards, deal cards) */
--color-accent-purple:  #5B4FE8   /* primary data accent — chart lines, active nav pill, donut segments */
--color-accent-purple-light: #A79AFB
--color-accent-pink:    #F7A9C4   /* secondary data accent — secondary chart line, pricing card */
--color-accent-yellow:  #F4D03F   /* highlight/selected state, "qualified" indicators */
--color-success:        #27AE60   /* growth %, "Accepted" status */
--color-warning:        #F5A623   /* "Pending" status */
--color-error:          #E74C3C   /* "Refunded"/error status */
--color-surface:        #FFFFFF
--color-surface-alt:    #F5F6F8   /* page background behind cards */
--color-border:         #ECEDF1
--color-text-primary:   #16181D
--color-text-secondary: #8A8F98
--color-text-inverse:   #FFFFFF
```

Gradient header (used on dashboard "Welcome Back" screens): linear-gradient 135°, `#4E7CF6` → `#5B4FE8`.

Card accent rotation (for list items needing visual distinction — deal cards, competitor cards, score cards): cycle through neutral-light (`#F1F0EE`), ink-dark (`#1B2942`), accent-purple (`#5B4FE8`), and yellow-highlight (`#F4D03F`) rather than defaulting every card to white. This is a deliberate kit signature — don't flatten it to all-white cards.

### 2.2 Typography

- **Display/Headline:** Bold geometric sans (Plus Jakarta Sans Bold or General Sans Bold), 28–34px, tight line-height (1.05–1.15), used for screen titles like "Records," "Select Your Plan," "All leads."
- **Body:** Same family, Regular/Medium, 15–16px, line-height 1.4.
- **Micro/Label:** 12–13px, Medium, `--color-text-secondary`, used for card meta ("Last visited," "Score," tag labels).
- **Numeric emphasis:** Large numerals (32–40px, Bold) for KPI callouts (balance, score, percentage) — numbers should always dominate their card visually over labels.

### 2.3 Shape & Elevation

- Card radius: **20–28px**, consistently large — this is a defining trait of the kit, never use sharp/4px corners.
- Button radius: fully pill-shaped (999px).
- Elevation: soft, diffuse shadows only (`0 8px 24px rgba(22,33,62,0.08)`), no hard drop shadows.
- Card padding: 20–24px internal, 16px screen margins.
- Bottom nav bar: floating pill container, active tab renders as a filled color capsule with icon + label, plus a small dot indicator beneath.

### 2.4 Iconography & Illustration

- Icons: single-weight line icons (Phosphor/Feather-style), circular colored backgrounds for avatars and category icons.
- Onboarding/auth illustrations: flat, pastel, semi-isometric character illustrations (person + floating UI cards/charts) — reserve this style **only** for onboarding, auth, and empty states, never for in-app data screens.
- Status is always color + text, never color alone (accessibility).

### 2.5 Core Components to Build Once, Reuse Everywhere

| Component | Spec |
|---|---|
| `PrimaryButton` | Ink navy fill, white text, pill shape, 52px height, optional trailing arrow icon |
| `SocialAuthRow` | Circular icon buttons (Facebook/Google/Instagram), 44px, outlined |
| `StatCard` | Large numeral + delta chip (green ↗ / red ↘) + short label underneath, white or gradient surface |
| `ContactCard` | Avatar (circular), name, meta line, monetary/quant value, trailing action icon (send/arrow) |
| `StatusPill` | Colored text label only (Pending/Accepted/Refunded), no background fill — matches reference kit |
| `SegmentedToggle` | Pill-shaped 2–3 way toggle (e.g. Monthly/Yearly, Overview/Weekly/Analytic) |
| `AccordionRow` | FAQ-style expand/collapse, light gray surface, chevron rotates on open |
| `BottomNav` | 4–5 items, active = filled purple pill capsule + label, inactive = icon only in gray |
| `EmptyState` | Illustration + one-line plain-language guidance + single CTA |

---

## 3. Information Architecture

### 3.1 Bottom Navigation (persistent, 5 items max)

```
Home        — daily snapshot, quick actions
Customers   — CRM: contacts, segments, forms, appointments, queue
Marketing   — scheduler, templates, campaigns, notifications
Orders      — ecommerce: catalog, storefront, order pipeline, payments
More        — profile, analytics, NFC/QR settings, billing, help
```

"More" avoids a 6th nav item by housing profile, analytics and settings behind one entry point (mirrors the reference "My Profile" screen pattern — stat badges up top, list rows below).

**Internal architecture vs. marketed pillars.** Externally Relay is still marketed and taught to owners as three pillars (CRM, Marketing, Commerce) — the nav above doesn't change. Internally, structure the codebase around **four** modules, with a fourth, non-marketed **Operations** module absorbing the parts of CRM/Commerce that are really about running the day-to-day: Appointments, Queue Management, Orders, Inventory, Payments, Business Settings, Staff. This keeps CRM screens focused on relationships (contacts, segments, loyalty, timeline) and Commerce screens focused on selling (catalog, storefront, discounts), while Operations owns the plumbing both depend on. A person using the app never sees "Operations" as a label; an engineer building it should.

**Persistent top bar (every primary screen).** In addition to the bottom nav, every top-level screen (Home, Customers, Marketing, Orders) carries a slim top bar: a global search icon (Section 4.9), a notification bell with an unread-count badge (Section 4.10), and the screen title. This replaces the ad hoc search icon that previously only appeared on the Customers screen.

**Floating quick-action button.** The "+" FAB on Home/Customers/Orders expands (tap → radial or bottom-sheet menu) into: Add customer, New order, New appointment, Create campaign, New product, Scan QR, Register NFC tag — rather than linking to a single fixed action. This replaces the single-purpose FAB used in the first pass of screens.

### 3.2 Onboarding Flow (4 steps, matches reference auth/onboarding screens)

1. **Welcome screen** — illustration, "Get Started" (ink pill button), "Already have an account? Sign In" link
2. **Business name** — single input, minimal
3. **Business category** — card-grid select (Restaurant / Fashion / Beauty / Retail / Services / Other), icon + label per card
4. **Connect tools** — toggle rows for Instagram / TikTok / Facebook / WhatsApp / Payment provider, each skippable
5. **Auto-generated business page confirmation** — shows generated NFC/QR landing page, product catalog stub, and customer capture form as a preview card before "Go to Dashboard"

### 3.3 Auth Screens

Reuse the reference kit's auth pattern exactly:
- Sign In: email + password fields, pill CTA, social icon row, "Forgot Password" + "Sign Up" links below
- Sign Up: email/password/confirm, inline validation banner (peach/orange, not red, for a softer first-touch error)
- Forgot Password: method-select cards (2FA / Password / Authenticator) with a green-bordered selected state
- Verification: illustrated card with masked contact info, "Re-send" as secondary, "Send Password" as primary

---

## 4. Screen-by-Screen Specifications

### 4.1 Home (Dashboard)

- Gradient header card: business name, total balance/revenue, month selector chip, growth delta
- Segmented toggle: Overview / Weekly / Analytic
- Donut chart: Active / Maintenance / Inactive customer split (3 colors: purple, pink-light, ink-dark)
- Bar/line chart: sales trend, purple + pink dual-line pattern from reference
- "Trending Items" list: product thumbnail, name, price, status pill (Pending/Accepted/Refunded)
- Quick action row: + New Order, + New Post, + New Customer (large touch targets, icon-first)

### 4.2 Customers (CRM)

**Customer list**
- Segmented filter chips: All / Permanent / Hot / New / VIP (horizontal scroll, pill style)
- `ContactCard` grid (2-column on larger phones, 1-column default): avatar, name, category/tag, total spent or pipeline value, send icon action
- Highlighted/selected card state: yellow fill (matches reference "Maria Green" selected card) — use for recently-active or flagged customers

**Customer profile (detail)**
- Header: avatar, name, tags as pills, quick-contact row (call/WhatsApp/email icons)
- Sections (accordion or scroll): Order history, Appointment history, Notes, **Customer Timeline** (new), Loyalty status, Reviews left, Wallet balance
- Sticky bottom action: "Send Message"

**Customer Timeline (new)**
- A single reverse-chronological activity feed per customer, replacing the vague "Interaction history" placeholder from the first pass. Each entry is a compact row: icon (matches the event type — site visit, NFC tap, order, notification opened, appointment booked, review left), one-line plain-language description, relative timestamp
- Source events: website visit, NFC/QR tap, order placed, push notification opened, appointment booked, review left, loyalty reward redeemed, form submitted
- Purpose: let a non-technical owner glance at one screen and understand "what has this person actually done," not just their aggregate stats

**Loyalty & Rewards (new — lives under CRM)**
- Program setup screen: reward type select (Points / Visit count / Cashback / Free item after X purchases / Birthday reward / Referral reward), threshold input, reward description
- Customer-facing: loyalty balance shown on their storefront/receipt ("3 more visits to your free coffee")
- Owner-facing: `StatCard` showing active members, redemptions this month, top loyalty customers list

**Reviews (new)**
- Customer-facing: star rating + optional written review + optional photo, collected post-order or post-appointment
- Owner-facing: average rating `StatCard`, review list (`ContactCard`-style: reviewer name, stars, snippet, date), reply action per review

**Customer Wallet (new)**
- Per-customer balance card: store credit, gift card balance, membership balance, prepaid service credit
- Owner actions: issue credit, adjust balance (with a required reason note for auditability), view transaction log

**Segmentation**
- Rule builder screen: plain-language condition rows ("Hasn't visited in [30] days", "Spent over [₦50,000]") — dropdown-driven, no query syntax exposed

**Forms Builder**
- Drag-and-drop field list (Name, Phone, Email, Dropdown, Rating, Text) rendered as stacked cards with a reorder handle
- Live preview pane toggled via segmented control (Edit / Preview)

**Customer Import Wizard (new)**
- Source select (CSV / Phone contacts / Excel / WhatsApp export / POS export where practical) → column-mapping screen (map spreadsheet columns to Name/Phone/Email/Tags via dropdowns) → dedupe-and-preview screen showing "142 customers found, 6 duplicates skipped" before final import

**Appointments**
- Calendar month view (compact), day agenda list below using `ContactCard`-style rows (customer, service, time)
- Booking creation: service select → time slot grid → confirm, 3 taps total

**Queue Management**
- Live queue list: position number (large numeral, matches "Score" card pattern from reference), customer name, wait estimate
- Business-side toggle: "Call Next" primary pill button

### 4.3 Marketing (Social Distribution)

**Composer**
- Media upload tile, caption field, hashtag chip input, platform toggle row — **Instagram and WhatsApp Status always on and tagged "Core"** (no toggle-off), Facebook/TikTok/Telegram as optional selectable circles, schedule vs. post-now segmented toggle

**Templates**
- Category tabs (Restaurant/Fashion/Beauty/Retail) → card grid of ready-made template thumbnails

**AI-assisted content**
- Labeled in-product as **"Create content faster"** — never surfaced as "AI" in copy, icon, or button label. Represent as a subtle sparkle icon inline in the composer, not a separate branded feature.

**Campaign Builder**
- Campaign type select cards (Promotion/Discount/Announcement/Event/New product)
- Push notification composer: title, message, optional image, CTA button label, audience target (segment picker reused from CRM), send-now/schedule toggle
- Analytics card per campaign: Sent / Delivered / Opened / Clicked / Converted as a horizontal stat row (numerals large, labels small — same `StatCard` pattern as Home)

**Ad Designer**
- Template picker → canvas editor (image, text, logo, color, CTA button) → export target selection (IG post / FB post / TikTok) as toggle chips

**Media Library (new — cross-cutting, surfaced here and in Orders/Settings)**
- Grid of previously uploaded logos, product photos, campaign images, and video, so an owner never re-uploads the same asset. Any upload control in the app (product photo, campaign image, storefront cover) opens "Upload new" or "Choose from library" rather than only a device picker.

**Social Media Content Library (new — distinct from Media Library)**
- Saved reusable captions, hashtag sets, template ideas, and drafts, browsable from within the Composer via a "Saved content" tab next to "New post" — tapping an item pre-fills the composer rather than starting blank each time.

### 4.4 Orders (Ecommerce)

**Product/Menu management**
- Card list: image thumbnail, name, price, inventory badge, availability toggle
- Restaurant mode swaps "Products" for "Menu" with Food/Drinks/Specials category tabs

**Inventory Intelligence (new — Growth/Pro)**
- A dedicated "Inventory" tab within Orders surfacing: low-stock alerts (banner + red badge on affected products), fast movers / slow movers / dead stock lists, total inventory valuation, and simple restock recommendations ("You usually reorder Jollof Rice every 9 days — it's been 8"). Basic tier keeps only the existing stock-count field and low-stock badge; the analysis views above are Growth/Pro only.

**Discounts & Promotions (new — dedicated module, not scattered)**
- List screen: active/scheduled/expired promotions as cards (type badge, value, date range)
- Creation flow: type select (Percentage / Fixed amount / Buy-one-get-one / Combo offer / Limited-time offer / Coupon code) → scope (all products / selected products / selected segment) → schedule → generated coupon code shown large and copyable
- Campaigns (Section 4.3) reference these promotions rather than duplicating discount logic — a campaign's CTA can attach an existing promotion instead of re-describing it in free text

**Storefront Template Builder (new)**
- Purpose: let a non-technical owner launch a live, branded storefront in minutes by picking a pre-built template and dropping their own products/services and logo into it — no design or code decisions required.
- Flow: **Choose a template → Customize → Add products/services → Preview → Launch**
  1. *Template gallery* — category-filtered grid (Restaurant / Fashion / Beauty / Retail / Services), each template shown as a live thumbnail card, tap to preview full-screen before committing
  2. *Customize* — logo upload, business name, one accent color pick (constrained to a curated palette so the storefront never looks broken), cover image; layout/structure of the template itself is fixed and not editable, to keep this a 2–3 tap flow. Within Customize, an "Advanced" expandable section adds: hero banner text/image, which products are "Featured" (pinned to top of the customer-facing grid), testimonials (pulled from Reviews, Section 4.2), a contact section (phone/address/hours pulled from Business Settings, Section 4.9), a business map pin, social links row, and SEO title/description for the storefront's link-preview card. Advanced fields are all optional with sensible defaults pulled from Business Settings so a first-time launch never blocks on them.
  3. *Add products/services* — pulls directly from the existing Product/Menu catalog (Section 4.4); owner just toggles which items appear and in what order, rather than re-entering product data
  4. *Preview* — live device-frame preview of the actual storefront before it's public
  5. *Launch* — assigns the storefront a subdomain in the form `businessname.myrelay.shop` (auto-slugified from business name, editable once before launch, checked for availability in real time), then goes live immediately with a "Copy link" and "Share" action. Growth/Pro tiers additionally show a "Connect a custom domain" option (bring-your-own-domain, e.g. `www.amaraskitchen.com`) with DNS instructions — this stays a future/flagged capability rather than a Phase 1 build item.
- Post-launch: storefront stays in sync automatically with the Product/Menu catalog and NFC/QR destinations (Section 4.5) — editing a product or reordering the menu updates the live storefront with no separate publish step
- Re-entry: owners can return anytime to swap templates (content carries over) or edit branding without rebuilding the storefront from scratch

**Online storefront (customer-facing, `businessname.myrelay.shop`)**
- Product/service grid → cart drawer (for product businesses) or booking CTA (for service businesses) → checkout (name/phone, delivery/pickup, payment method) → order confirmation with tracking status

**Order pipeline**
- Horizontal stepper: New → Confirmed → Preparing → Ready → Completed, rendered as the dark stacked cards seen in the reference "Competitor Sales" screen (date, order title, amount, customer avatars), color-coded by stage rather than all-navy
- Tap card → order detail with one-tap stage advance button

**Payments**
- Simple ledger: Paid / Pending / Completed as `StatusPill`, payment method icon (bank transfer, cash, Nigerian provider logos)

### 4.5 NFC/QR Designer

- Settings screen: list of active NFC tags/QR codes, each row shows destination (Menu/Booking/Shop), tap to reassign via bottom-sheet picker
- **Design step (new)** — before generation, an owner customizes: QR color (from the same curated accent palette used in the Storefront Builder, so codes always stay scannable — no arbitrary low-contrast colors), an optional center logo, a frame style (rounded/square/none), and a short label printed under the code ("Scan to see today's menu"). NFC tags get a name, an icon, and a custom "scan message" shown the instant a phone taps the tag (e.g. "Welcome to Amara's Kitchen 👋").
- Generation flow: select destination type → design (above) → auto-generate code → preview physical card mockup → export
- **Export formats (new):** PNG, SVG, and PDF single-code downloads, plus a "Print sheet" option that lays out multiple codes (e.g. one per table) on a single printable PDF page.

### 4.6 Analytics ("More" tab)

- Today snapshot: Visitors / Customers / Orders / Revenue as a 2×2 `StatCard` grid
- Customer analytics: new vs returning donut (reuse Home's donut component)
- Marketing analytics: posts published, campaign performance, notification opens/clicks — horizontal `StatCard` scroller
- Sales analytics: revenue trend line, best products list (reuse `ContactCard` layout with product image instead of avatar)

### 4.7 Profile / More

- Matches reference "My Profile" screen: avatar with edit pencil, name + @handle, two stat badges (Products / Team Projects), then list rows (Business Settings, Notifications, Reports, Business Goals, Help Center, Plan & Billing) each with icon-in-circle + chevron
- Settings gear icon top-right → account, billing/plan, connected tools, notification preferences, help/FAQ (accordion pattern from reference), logout

### 4.9 Business Settings (new)

A dedicated screen, not scattered across menus — reached from Profile/More.

- **Business Profile:** name, logo, cover photo, description, category, address, phone numbers, email, website — this is the single source of truth other screens read from (Storefront Advanced customize, NFC scan message, Reviews contact section all pull from here rather than duplicating fields)
- **Operating Hours:** per-day open/close time rows, a "Holiday hours" override list, and a "Temporary closure" toggle with a start/end date and an optional customer-facing message ("Closed for renovation, back July 22")
- **Branding:** brand color (feeds the Storefront/QR palettes), theme, logo, favicon, store banner — edited once here, referenced everywhere rather than re-picked per feature

### 4.10 Notification Center (new)

- Bell icon in the persistent top bar (Section 3.1) with an unread-count badge
- Feed of inbound, not outbound, notifications: new order, new appointment, queue joined, form submitted, payment received, product low in stock, campaign completed, social post published
- Each row: icon by type, one-line description, timestamp, unread dot; tapping deep-links straight into the relevant screen (e.g. "New order from Amara Obi" → that order's detail)
- Filter chips by type (Orders / Appointments / Marketing / Inventory / System) at the top of the feed
- "Mark all as read" action; read state persists across devices

### 4.11 Global Search (new)

- Search icon in the persistent top bar opens a full-screen search overlay (not a page navigation) with a single input at top
- Searches across Customers, Orders, Products, Campaigns, Appointments, Queue, Forms, and NFC tags in one query, results grouped under type headers with the matching icon
- Empty-input state shows "Recent searches" instead of a blank screen

### 4.12 Reports (new)

- Distinct from Analytics (Section 4.6): Analytics shows current/live data, Reports summarize a fixed past period
- Report type select: Daily / Weekly / Monthly / Sales / Customer / Marketing
- Each generates a shareable summary with a "Download PDF" and "Download Excel" action; scheduled recurring reports (e.g. "email me the weekly report every Monday") are a Pro capability, matching the Analytics tier table in Section 4.17

### 4.13 Business Goals (new)

- Owner sets simple numeric targets: monthly revenue, orders target, new-customer target, follower/reach target
- Home dashboard (Section 4.1) gains a slim progress strip beneath the balance card once goals exist: goal name, progress bar, "68% of the way to ₦1,000,000 this month" — keeps the motivational framing on the screen owners already open first

### 4.14 Subscription Usage Dashboard (new)

- Lives inside Plan & Billing (Section 4.17): a plain list of what's being used against what's included — customers (18,422 / Unlimited ✔), push subscribers (842 / 1,000 — shown as a progress bar once past 80%), scheduled posts (Unlimited), orders this month (1,209)
- Anything approaching a real limit (e.g. push subscribers on Basic) gets a small warning tag and a one-tap "Upgrade" shortcut — no surprise overage charges or silent throttling

### 4.15 Webhooks & Integrations (new — Pro only)

- Simple list: connected integrations (Zapier, Make) plus a "Custom webhook" option (destination URL, event type picker: new order / new customer / campaign completed, test-send button)
- REST API access is presented here as an API key + link to documentation, gated to Pro, framed as a technical add-on rather than a core screen a non-technical owner needs to understand

### 4.16 Help Center (new)

- Distinct from the reference kit's simple FAQ accordion: adds a searchable tutorial library (short how-to videos/articles per feature), a changelog ("What's new in Relay"), and the FAQ accordion pattern from the reference kit for quick answers, with a persistent "Still stuck? Message us" CTA at the bottom

### 4.17 Plan/Billing

**Core rule — one subscription = one business.** A subscription licenses exactly one business profile, one online store, one customer database, one analytics dashboard, one social workspace, one product/menu catalog. An owner with multiple businesses (e.g. a restaurant and a separate fashion store) holds a separate subscription per business — there is no multi-business toggle or workspace switcher anywhere in the product. Make this legible on the plan screen itself with a small line under the price: *"Covers one business."*

**Instagram and WhatsApp Status are core, not premium.** They ship active on every tier, including Basic — never gated, never shown with a lock icon. In the Marketing composer's platform-select row (Section 4.3), Instagram and WhatsApp render with a small "Core" tag distinct from the other togglable platforms.

**Plans**

| | **Basic** — ₦10,000/mo | **Growth** — ₦15,000/mo | **Pro** — ₦25,000/mo |
|---|---|---|---|
| Positioning | Run your business efficiently | Automate customer engagement & marketing | Advanced insight and operational control |
| Social | Instagram + WhatsApp Status (core), Facebook/TikTok/Telegram, unlimited scheduled posts, content calendar | + bulk scheduling, multi-platform publishing, AI-assisted captions/hashtags ("Create content faster"), media library, drafts | + unlimited scheduled content, brand asset manager, team approvals, content strategy insights |
| CRM | Unlimited customers, profiles, tags, contact forms, appointments, queue | + segmentation, loyalty program, referral tracking, purchase history, CLV, smart groups | + customer scoring, predictive insights, behavioral analytics, custom attributes |
| Ecommerce | Unlimited products, online store, menu builder, QR/NFC ordering, basic inventory, order management | + advanced inventory, variants, coupons, delivery options, table ordering, sales reporting | + inventory forecasting, supplier management, purchase orders, KDS, advanced order routing |
| Campaigns | Up to 1,000 push subscribers, campaign creator/scheduler, ready-made templates | + automated journeys (welcome, birthday, loyalty, abandoned cart, appointment reminder, win-back) | + trigger-based journeys, personalized/recurring campaigns, A/B testing, rich push |
| Analytics & Reports | Dashboard, customer/sales/marketing overview | + retention, conversion, campaign & product performance, revenue trends, visitor insights | + executive dashboard, business health score, revenue forecasting, funnel/cohort analysis, custom & scheduled reports |
| Operations | — | — | Unlimited staff accounts, role-based permissions, activity logs, performance reports, Webhooks/API |

**UI treatment:** Monthly/Yearly segmented toggle at top; plan-tier tabs read **Basic / Growth / Pro** (not Individual/Small Business/Enterprise); colored pricing cards rotate pink → purple-outline (current plan or recommended) → ink-dark, each headed by its one-line positioning statement rather than a generic tagline; "Covers one business" sits directly under the price on every card; sticky CTA "Start 7-day free trial." When a lower-tier feature list is shown, each row above the current tier's ceiling is prefixed with "+" to signal it's additive over the tier below, matching the table above. The Subscription Usage Dashboard (Section 4.14) sits directly beneath the plan cards on this same screen.

---

## 4.18 Responsive Breakpoints (Tablet & Desktop)

Mobile (Section 4.1–4.17) is the primary, fully-specified experience. Tablet and desktop are not the same screens stretched wider — each gets a layout native to its own screen, built from the exact same component set (Section 2.5) and tokens (Section 2.1), so nothing looks like a separate product.

**Mobile (< 768px):** bottom nav, single column, one primary action per screen — as specified above.

**Tablet (768–1279px):** bottom nav is replaced by a collapsed **icon-only left rail** (labels dropped, active item shown as a filled purple pill, same as the mobile bottom nav's active state). Content shifts from single-column to **two-column** where the data supports it: Home puts the balance card and the customer-split donut side by side; Customers, Orders and the Menu/Product list move to a 2-up card grid; the Marketing composer splits into form (left) + live preview (right), since a tablet has room to show what's being published without a separate preview step.

**Desktop (≥ 1280px):** a full **labeled left sidebar** (logo, nav items with icons + text, active item filled purple, a mini profile card pinned to the bottom) replaces the rail. A persistent top bar holds the global search input (Section 4.11, now a real inline field rather than just an icon) and the notification bell (Section 4.10). Content area widens to **up to 4 columns** for KPI stat cards and 2 columns for chart/list pairings. Two specific screens get a genuinely different shape at desktop width because the data is naturally wider, not because desktop "has more space to fill":
- **Customers** gains a persistent right-hand detail pane (list + profile side by side) — the one deliberate master-detail pattern in the whole app.
- **Orders** becomes a true horizontal kanban across all five pipeline stages at once, instead of one stage at a time behind chips.

**What never changes across breakpoints:** rounded-card language, plain-language copy, status-as-color-plus-text, and the rule that no screen at any breakpoint becomes a dense data table. If a desktop screen starts to feel like an enterprise dashboard, that's a signal the layout has drifted from the brief, not that the brief needs an exception.

---

## 5. Interaction & Motion Guidelines

- Screen transitions: horizontal slide for forward nav, no full-page fades (feels native).
- Bottom sheet for any secondary action that doesn't warrant a full screen (reassign NFC tag, pick audience segment, confirm delete).
- Micro-feedback: button press scale (0.97), pill toggle slide animation ≤150ms.
- Charts animate in on mount (draw-in effect), not on every re-render.
- Empty states always pair an illustration with exactly one primary action — never a blank list.

---

## 6. Technical Architecture

### 6.1 Recommended Stack

Given a mobile-first, tap-friendly, offline-tolerant target, two viable paths:

**Option A — React Native (Expo)**
- Best if Relay should live on App Store/Play Store as a true native app
- Expo + React Native Paper/Tamagui for the design-token system in Section 2
- Push notifications via Expo Notifications (native APNs/FCM)
- NFC via `react-native-nfc-manager`; QR via `expo-camera` + `expo-barcode-scanner`

**Option B — React + PWA (installable web app)**
- Faster to ship and iterate, matches your existing Fabruby/Shoppe workflow
- Web NFC API (Android/Chrome only — flag iOS gap explicitly to stakeholders) + QR fallback via camera
- Service worker for offline caching of dashboard shell + last-synced data
- Push via Web Push API / Firebase Cloud Messaging

Recommendation: **start with Option B (React PWA + Firebase)** to match your current stack and ship fast, with Option A as a v2 path once product-market fit is validated — this mirrors how you've sequenced Fabruby/Realm/Clutch.

### 6.2 Backend / Data Layer

- **Auth:** Firebase Auth (email/password + social providers, matches the Sign In screen's FB/Google/Instagram row)
- **Database:** Firestore for CRM/social/order data (documents map naturally to Customer, Order, Post, Campaign entities); Firestore security rules scoped per-business (`businesses/{businessId}/...` subcollections) with role-based admin access, similar to the rule pattern you already built for the trading app
- **File storage:** Firebase Storage for product images, post media, business logos
- **Scheduled jobs:** Cloud Functions (scheduled) for: queued social posts, scheduled push campaigns, appointment reminders, "customer inactive 30 days" segment refresh
- **Social platform integrations:** Meta Graph API (Instagram/Facebook), TikTok Content Posting API, WhatsApp Business API (Cloud API), Telegram Bot API — abstract behind a single `SocialPublisher` service interface so adding X/LinkedIn later doesn't touch UI code
- **Payments:** Paystack/Flutterwave as the primary Nigerian payment providers, plus a manual "bank transfer" and "cash" record-only option
- **Storefront hosting/subdomains:** wildcard DNS (`*.myrelay.shop`) pointed at a single storefront-rendering service that resolves `req.subdomain` → `Storefront` document at request time; wildcard SSL cert covers all tenants automatically. Slug availability check is a Cloud Function callable that runs on every keystroke in the launch flow (debounced) against a `storeSlug` uniqueness index. Template gallery content (`StorefrontTemplate.layoutConfig`) is just data — the same renderer serves every business, so adding a new template is a content addition, not a code change
- **OCR/AI content assist:** Wrap whatever LLM you use (you've used Gemini 2.0 Flash free tier elsewhere) behind a `/generate-caption` internal endpoint — never expose model name/branding in UI copy per Section 4.3

### 6.3 Data Model (core entities)

```
Business {
  id, name, category, ownerUid, plan,          // plan: basic | growth | pro — one business per subscription
  connectedTools[], nfcTags[], storeSlug
  // storeSlug is the subdomain segment, e.g. "amaraskitchen" -> amaraskitchen.myrelay.shop
  // Instagram + WhatsApp Status are always present in connectedTools and cannot be removed
}

Storefront {
  id, businessId, templateId, accentColor, logoUrl, coverImageUrl,
  visibleProductIds[], // ordered subset of Business's Product/Menu items
  subdomain,           // "{storeSlug}.myrelay.shop", uniqueness-checked at launch
  status,              // draft | live
  publishedAt
}

StorefrontTemplate {
  id, name, category, previewImageUrl, layoutConfig
}

Customer {
  id, businessId, name, phone, email, birthday, location,
  tags[], notes, totalSpent, orderIds[], appointmentIds[],
  lastVisited, createdAt
}

Segment {
  id, businessId, name, rules[]  // e.g. { field: "lastVisited", op: ">", value: "30d" }
}

Product {
  id, businessId, name, image, description, price, category,
  inventory, variants[], available
}

Order {
  id, businessId, customerId, items[], status, // New→Confirmed→Preparing→Ready→Completed
  paymentStatus, paymentMethod, createdAt
}

Appointment {
  id, businessId, customerId, service, startTime, status, reminderSent
}

Post {
  id, businessId, mediaUrl, caption, hashtags[], platforms[],
  scheduledAt, status, aiAssisted: bool
}

Campaign {
  id, businessId, type, title, message, image, ctaLabel,
  targetSegmentId, sentAt, stats: { sent, delivered, opened, clicked, converted }
}

NfcCode {
  id, businessId, label, destinationType, destinationUrl,
  qrColor, qrLogoUrl, qrFrameStyle, printedLabel, scanMessage
}

Notification {
  id, businessId, type, // new_order | new_appointment | queue_joined | form_submitted |
                        // payment_received | low_stock | campaign_completed | post_published
  message, deepLinkTo, read, createdAt
}

CustomerTimelineEvent {
  id, businessId, customerId, type, // site_visit | nfc_tap | order | notification_opened |
                                     // appointment_booked | review_left | loyalty_redeemed | form_submitted
  description, createdAt
}

LoyaltyProgram {
  id, businessId, rewardType, // points | visit_count | cashback | free_item_after_x | birthday | referral
  threshold, rewardDescription
}

Review {
  id, businessId, customerId, orderIdOrAppointmentId, rating, text, photoUrls[], ownerReply, createdAt
}

WalletAccount {
  id, businessId, customerId, storeCredit, giftCardBalance, membershipBalance
}

WalletTransaction {
  id, walletAccountId, amount, type, // credit | debit
  reason, createdBy, createdAt
}

Promotion {
  id, businessId, type, // percentage | fixed | bogo | combo | limited_time | coupon
  value, scope, couponCode, startsAt, endsAt, status
}

MediaAsset {
  id, businessId, url, type, // logo | product_photo | campaign_image | video | social_asset
  uploadedAt
}

ContentLibraryItem {
  id, businessId, type, // caption | hashtag_set | template | idea | draft
  content, createdAt
}

Report {
  id, businessId, type, // daily | weekly | monthly | sales | customer | marketing
  periodStart, periodEnd, fileUrlPdf, fileUrlExcel, generatedAt
}

BusinessGoal {
  id, businessId, type, // revenue | orders | new_customers | followers
  target, period, currentProgress
}

Webhook {
  id, businessId, destinationUrl, eventType, // new_order | new_customer | campaign_completed
  active
}

StaffAccount {
  id, businessId, uid, role, permissions[]
}
```

### 6.5 Cross-Cutting UX Rules (from the platform-utilities pass)

- **Single source of truth:** Business Settings (Section 4.9) is the only place Business Profile, Operating Hours, and Branding are edited. Every other screen (Storefront Advanced customize, NFC scan message, Reviews contact section, Help Center contact CTA) reads from it — never re-collects the same fields.
- **Upload once, reuse everywhere:** any image/video upload control opens "Upload new" or "Choose from library" (Media Library, Section 4.3) rather than only a bare device file picker.
- **Notifications are two-directional:** the existing push-notification Campaign Builder (Section 4.3) sends to customers; the Notification Center (Section 4.10) receives operational events for the owner. Don't conflate the two inboxes.
- **Tier gating is visible, not silent:** any feature gated above the current plan shows a small lock + "Upgrade to unlock" rather than being hidden — consistent with the Subscription Usage Dashboard's "no surprises" principle (Section 4.14).

### 6.4 Non-Functional Requirements

- **Performance:** first meaningful paint <1.5s on mid-tier Android over 3G; lazy-load charts and non-critical images
- **Offline tolerance:** dashboard shell + last-synced customer/order data cached; queued actions (new order, new customer) sync on reconnect
- **Accessibility:** status always paired with text label, not color alone (Section 2.4); minimum 44×44px tap targets throughout
- **Localization-ready:** currency formatting abstracted (₦ default, but not hardcoded), copy strings externalized for future language support

---

## 7. Build Phasing

1. **Phase 1 — Foundation:** design tokens, core components (Section 2.5), auth + onboarding flow, Home dashboard shell, Business Settings (Section 4.9) — built early since other features read from it
2. **Phase 2 — CRM pillar:** Customers list/profile, Customer Timeline, segmentation, Forms Builder, Customer Import Wizard, Appointments, Loyalty & Rewards, Reviews, Customer Wallet
3. **Phase 3 — Ecommerce pillar:** Product/Menu management, Inventory Intelligence, Discounts & Promotions, Storefront Template Builder (template gallery, customize, subdomain provisioning on `myrelay.shop`, public-facing customization), order pipeline, payments
4. **Phase 4 — Marketing pillar:** Composer, Templates, Media Library, Content Library, Campaign Builder, push notifications, ad designer
5. **Phase 5 — NFC/QR Designer + Analytics/Reports:** design + generation + export flows, full analytics tab, Reports, Business Goals, billing/plan screens, Subscription Usage Dashboard
6. **Phase 6 — Platform glue:** Notification Center, Global Search, expanded Quick Actions FAB, Help Center
7. **Phase 7 — Pro-tier operations:** Staff accounts & permissions, Webhooks & Integrations
8. **Phase 8 — Polish:** offline handling, motion pass, empty states, accessibility audit

---

*This document is intended as a working build prompt — hand it directly to a code-generation tool, or use it as the shared reference doc between design and engineering.*
