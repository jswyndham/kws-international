'use client';

import React from 'react';
import { MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/routing';

const Footer = () => {
	const t = useTranslations('Footer');

	return (
		<footer className="bg-[#001F3F] border-t border-white/10 py-12">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Link
								href="/"
								className="flex items-center space-x-2"
							>
								<Image
									src="/images/logo.png"
									alt="Kyoto Web Studio Logo"
									width={125}
									height={100}
								/>
							</Link>
						</div>
						<p className="text-white/60 text-sm">{t('tagline')}</p>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-4">
							{t('company.title')}
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="/about"
									className="text-white/60 hover:text-[#06B6D4] transition-colors"
								>
									{t('company.about')}
								</Link>
							</li>
							<li>
								<Link
									href="/blog"
									className="text-white/60 hover:text-[#06B6D4] transition-colors"
								>
									{t('company.blog')}
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-white/60 hover:text-[#06B6D4] transition-colors"
								>
									{t('company.contact')}
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-4">
							{t('contactInfo.title')}
						</h4>

						<div className="flex space-x-4 mt-6">
							<Link
								href="https://github.com/jswyndham"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/60 hover:text-[#06B6D4] transition-colors"
								aria-label="GitHub"
							>
								<Github className="w-5 h-5" />
							</Link>
							<Link
								href="https://www.linkedin.com/in/james-saunders-wyndham-b6015599/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/60 hover:text-[#06B6D4] transition-colors"
								aria-label="LinkedIn"
							>
								<Linkedin className="w-5 h-5" />
							</Link>
						</div>
					</div>
				</div>

				<div className="border-t border-white/10 pt-8 text-center">
					<p className="text-white/60 text-sm">{t('copyright')}</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
