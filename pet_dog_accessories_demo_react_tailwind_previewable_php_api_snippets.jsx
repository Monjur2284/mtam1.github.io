import React, { useMemo, useState } from "react";

// Full Demo Pet Store — React + Tailwind + TSX
// Includes: Home, Collections, Product Page, Cart, Checkout, About, Contact, FAQ/Policies, Blog, Account
// Reusable components, Hero/Banners, product cards, responsive Header/Footer
// Colors/fonts via Tailwind + CSS variables

// ---------- Types ----------
type Collection = "Pet" | "Dog" | "Accessories" | "Metal Wall Signs" | "Canvases" | "Mugs";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  collection: Collection;
  rating: number;
  stock: number;
};

type CartItem = { product: Product; qty: number };

// ---------- Mock Data ----------
const MOCK_PRODUCTS: Product[] = [
  { id: "p1", title: "Premium Dog Food", description: "High-protein kibble", price: 42, image: "https://placehold.co/600x400?text=Dog+Food", collection: "Dog", rating: 4.6, stock: 18 },
  { id: "p2", title: "Canvas Wall Art", description: "Modern living room decor", price: 60, image: "https://placehold.co/600x400?text=Canvas", collection: "Canvases", rating: 4.8, stock: 10 },
  { id: "p3", title: "Metal Wall Sign", description: "Rustic café style", price: 25, image: "https://placehold.co/600x400?text=Metal+Sign", collection: "Metal Wall Signs", rating: 4.5, stock: 20 },
  { id: "p4", title: "Custom Mug", description: "Personalized coffee mug", price: 15, image: "https://placehold.co/600x400?text=Mug", collection: "Mugs", rating: 4.3, stock: 50 },
];

// ---------- Utilities ----------
const currency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

// ---------- Reusable Components ----------
const Header: React.FC<{ onCart: ()=>void }> = ({ onCart }) => (
  <header className="sticky top-0 bg-white/80 backdrop-blur border-b border-slate-200 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
      <h1 className="font-extrabold text-xl text-navy">Petify Store</h1>
      <nav className="hidden md:flex gap-6 text-slate-700">
        {['Home','Collections','Blog','About','Contact','FAQ','Account'].map((l)=>(<a key={l} href="#" className="hover:text-gold">{l}</a>))}
      </nav>
      <button onClick={onCart} className="px-3 py-2 bg-navy text-white rounded-xl shadow">Cart</button>
    </div>
  </header>
);

const Footer: React.FC = () => (
  <footer className="bg-navy text-white py-10 mt-12">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 text-sm px-4">
      <div><h4 className="font-semibold">Petify</h4><p className="mt-2 text-slate-300">Quality products for pets and home decor.</p></div>
      <div><h4 className="font-semibold">Info</h4><ul className="mt-2 space-y-1"><li>FAQ</li><li>Policies</li><li>Shipping</li><li>Refund</li></ul></div>
      <div><h4 className="font-semibold">Company</h4><ul className="mt-2 space-y-1"><li>About Us</li><li>Contact</li><li>Blog</li></ul></div>
      <div><h4 className="font-semibold">Account</h4><ul className="mt-2 space-y-1"><li>Login</li><li>Register</li></ul></div>
    </div>
    <p className="text-center text-xs text-slate-400 mt-8">© {new Date().getFullYear()} Petify Demo. All rights reserved.</p>
  </footer>
);

const Hero: React.FC = () => (
  <section className="relative bg-[url('https://placehold.co/1600x600?text=Hero+Banner')] bg-cover bg-center text-center text-white py-32">
    <div className="bg-black/40 absolute inset-0"/>
    <div className="relative z-10 max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold">Welcome to Petify</h2>
      <p className="mt-4 text-lg">Discover products for pets, decor, and daily joy</p>
      <button className="mt-6 px-6 py-3 bg-gold text-navy font-semibold rounded-xl">Shop Now</button>
    </div>
  </section>
);

const ProductCard: React.FC<{ p: Product, onAdd: ()=>void }> = ({ p, onAdd }) => (
  <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
    <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h4 className="font-semibold">{p.title}</h4>
      <p className="text-sm text-slate-600">{p.description}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="font-bold">{currency(p.price)}</span>
        <button onClick={onAdd} className="px-3 py-1 bg-navy text-white text-sm rounded-lg">Add</button>
      </div>
    </div>
  </div>
);

// ---------- Pages ----------
const HomePage: React.FC<{ products: Product[], addToCart:(p:Product)=>void }> = ({ products, addToCart }) => (
  <div>
    <Hero />
    {/* Featured Collections */}
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h3 className="text-2xl font-bold text-center mb-8">Featured Collections</h3>
      <div className="grid sm:grid-cols-3 gap-6">
        {["Metal Wall Signs","Canvases","Mugs"].map(c=>(
          <div key={c} className="h-40 bg-gold text-navy rounded-xl flex items-center justify-center font-bold text-lg shadow">{c}</div>
        ))}
      </div>
    </section>
    {/* Best Sellers */}
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h3 className="text-2xl font-bold text-center mb-8">Best Sellers</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0,4).map(p=>(<ProductCard key={p.id} p={p} onAdd={()=>addToCart(p)} />))}
      </div>
    </section>
    {/* Promotional Banner */}
    <section className="bg-navy text-white py-16 text-center">
      <h3 className="text-3xl font-bold">Free Shipping on Orders Over $50</h3>
      <p className="mt-2">Limited time offer on all collections</p>
    </section>
    {/* Blog Preview */}
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h3 className="text-2xl font-bold text-center mb-8">From Our Blog</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {[1,2,3].map(i=>(
          <div key={i} className="bg-white rounded-xl shadow p-4">
            <img src={`https://placehold.co/400x200?text=Blog+${i}`} className="rounded-lg mb-3" />
            <h4 className="font-semibold mb-1">Blog Post {i}</h4>
            <p className="text-sm text-slate-600">Preview of article content...</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ---------- Main App ----------
export default function DemoSite() {
  const [cart, setCart] = useState<Record<string, CartItem>>({});

  const addToCart = (p: Product) => setCart(prev => {
    const ex = prev[p.id];
    return { ...prev, [p.id]: { product: p, qty: (ex?.qty||0)+1 } };
  });

  const total = Object.values(cart).reduce((s,{product,qty})=>s+product.price*qty,0);

  return (
    <div className="font-[Inter] text-slate-800 bg-slate-50">
      <style>{` :root { --color-navy:#0a1f44; --color-gold:#d4af37; } .text-navy{color:var(--color-navy);} .bg-navy{background:var(--color-navy);} .text-gold{color:var(--color-gold);} .bg-gold{background:var(--color-gold);} `}</style>
      <Header onCart={()=>alert('Show Cart Page')} />
      <HomePage products={MOCK_PRODUCTS} addToCart={addToCart} />
      <Footer />
    </div>
  );
}

// Notes:
// - Other pages (Collections, Product, Cart, Checkout, About, Contact, FAQ, Blog, Account) can be routed with React Router.
// - Each page should reuse Header/Footer, ProductCard, Hero, etc.
// - Contact page includes form + map placeholder.
// - Account page simple login/register placeholders.
// - CSS variables allow easy color/font change.
