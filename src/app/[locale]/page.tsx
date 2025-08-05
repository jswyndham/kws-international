import Hero from '../components/home/Hero';
import Portfolio from '../components/home/Portfolio';
import Services from '../components/home/Services';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

export default function Home() {
	return (
		<div className="min-h-screen w-screen bg-[#001F3F]">
			<Header />
			<main>
				<Hero />
				<Portfolio />
				<Services />
			</main>
			<Footer />
		</div>
	);
}
