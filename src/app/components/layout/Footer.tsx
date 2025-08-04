'use client';

import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
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
							{t('services.title')}
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="/services#web-development"
									className="text-white/60 hover:text-[#06B6D4] transition-colors"
								>
									{t('services.webDevelopment')}
								</Link>
							</li>
							<li>
								<Link
									href="/services#seo"
									className="text-white/60 hover:text-[#06B6D4] transition-colors"
								>
									{t('services.seoOptimization')}
								</Link>
							</li>
							<li>
								<Link
									href="/services#wordpress"
									className="text-white/60 hover:text-[#06B6D4] transition-colors"
								>
									{t('services.wordpress')}
								</Link>
							</li>
							<li>
								<Link
									href="/services#react"
									className="text-white/60 hover:text-[#06B6D4] transition-colors"
								>
									{t('services.react')}
								</Link>
							</li>
						</ul>
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
									href="/portfolio"
									className="text-white/60 hover:text-[#06B6D4] transition-colors"
								>
									{t('company.portfolio')}
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
						<ul className="space-y-3">
							<li className="flex items-center text-white/60">
								<MapPin className="w-4 h-4 mr-2 text-[#06B6D4]" />
								{t('contactInfo.location')}
							</li>
							<li className="flex items-center text-white/60">
								<Mail className="w-4 h-4 mr-2 text-[#06B6D4]" />
								{t('contactInfo.email')}
							</li>
							<li className="flex items-center text-white/60">
								<Phone className="w-4 h-4 mr-2 text-[#06B6D4]" />
								{t('contactInfo.phone')}
							</li>
						</ul>
						<div className="flex space-x-4 mt-6">
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/60 hover:text-[#06B6D4] transition-colors"
								aria-label="GitHub"
							>
								<Github className="w-5 h-5" />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/60 hover:text-[#06B6D4] transition-colors"
								aria-label="LinkedIn"
							>
								<Linkedin className="w-5 h-5" />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-white/60 hover:text-[#06B6D4] transition-colors"
								aria-label="Twitter"
							>
								<Twitter className="w-5 h-5" />
							</a>
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
