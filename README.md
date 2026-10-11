# BazarDor (বাজার দর) - Daily Market Price Tracker


## Short Description
**BazarDor** is a modern, fully responsive web application built to monitor the daily market prices of essential commodities in Bangladesh. Designed with a clean, localized Bengali interface, the platform provides users with real-time insights into price fluctuations, detailed market-specific average prices, and secure user profiles.

Whether you want to check if the price of rice has gone up or find the cheapest market for vegetables, BazarDor puts the daily market at your fingertips.



##  Key Features
Here are the core features of the BazarDor application:

1. **Comprehensive Price Tracking (Trending Risers & Fallers)**
   - The homepage highlights top price surges ("আজ দাম বেড়েছে ▲") and drops ("আজ দাম কমেছে ▼") using intuitive color-coded badges. It also features a continuously scrolling marquee ticker showing live prices across the navbar.

2. ** Secure Authentication & Protected Routes**
   - Seamless user authentication powered by **BetterAuth**. Supports Email/Password registration alongside seamless **Google** and **GitHub** social logins. Sensitive pages (like Product Details) are fully protected and require the user to be logged in.

3. ** Smart Category Filtering & Sorting (Bengali Numeral Support)**
   - Users can browse products by categories (e.g., চাল, ডাল, সবজি) via a sticky navigation bar. Includes a custom-built sorting feature that accurately sorts prices (Low to High / High to Low) by parsing Bengali numerals natively.

4. ** Detailed Regional Market Insights**
   - Clicking on any product unlocks a detailed view showing the Minimum, Maximum, and Average prices. It includes a structured data table displaying exact prices across various regional markets (e.g., Mymensingh, Rajshahi, Khulna).

5. ** User Profile Management**
   - Authenticated users have access to a dedicated Profile section where they can view their account details and update their personal information (Name) in real-time.

6. ** 100% Responsive & Localized UI**
   - The application is optimized for all screen sizes (Mobile, Tablet, Desktop). The entire interface, including dynamic data, numbers, and dates, is localized into Bengali for an authentic user experience. It also includes friendly custom 404 pages and skeleton loading states.



##  Technologies Used

- **Framework:** Next.js (App Router, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** BetterAuth
- **Notifications:** React Hot Toast
- **Icons:** Lucide React
- **Deployment:** Vercel / Netlify 



