import Hero from '../components/home/Hero';
import Portfolio from '../components/home/Portfolio';
import Services from '../components/home/Services';

export default function Home() {
	return (
		<div className="min-h-screen w-screen bg-[#001F3F]">
			<main>
				<Hero />
				<Portfolio />
				<Services />
			</main>
		</div>
	);
}
