import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

export default function Home() {
	return (
		<div className="min-h-screen bg-[#001F3F]">
			<Header />
			<main>
				<Hero />
				<Services />
			</main>
			<Footer />
		</div>
	);
}
