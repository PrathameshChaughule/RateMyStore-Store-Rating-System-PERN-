import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import TrendingStores from '../components/TrendingStores';
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

const Landing = () => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
            <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        // body { margin: 0; font-family: 'Inter', sans-serif; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
            <div className="bg-slate-50 text-slate-900 antialiased">
                <Navbar />
                <main>
                    <Hero />
                    <Features />
                    <TrendingStores />
                    <CallToAction />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Landing