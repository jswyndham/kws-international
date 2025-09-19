'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

const ContactPage = () => {
	const t = useTranslations('Contact');
	const locale = useLocale();
	const isJapanese = locale === 'ja';

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		company: '',
		projectType: '',
		budget: '',
		message: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSubmitStatus('success');
				setFormData({
					name: '',
					email: '',
					company: '',
					projectType: '',
					budget: '',
					message: '',
				});
			} else {
				setSubmitStatus('error');
			}
		} catch (error) {
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
			setTimeout(() => setSubmitStatus('idle'), 5000);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<section className="min-h-screen py-32 bg-gradient-to-br from-[#001F3F] via-[#001F3F]/95 to-[#4F46E5]/20">
			{/* Header with Portfolio-style animation */}
			<div className="mb-12 lg:mb-24 pl-8 md:pl-20">
				<div className="relative h-[120px] md:h-[100px] flex items-center">
					<motion.div
						className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/30 z-20"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1, ease: 'easeOut' }}
					/>

					<div className="absolute bottom-0 left-0 right-0 h-full">
						<motion.h1
							className={`absolute text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-wide ${
								isJapanese
									? 'font-zenOldMincho'
									: 'font-helvetica'
							}`}
							style={{ bottom: '10px' }}
							initial={{
								x: 'calc(50vw - 50% - 80px)',
								y: 120,
								opacity: 0,
							}}
							whileInView={{
								x: 0,
								y: 0,
								opacity: 1,
							}}
							viewport={{ once: true, margin: '-50px' }}
							transition={{
								duration: 1.2,
								ease: [0.25, 0.1, 0.25, 1],
								y: {
									delay: 0.5,
									duration: 0.9,
									ease: 'easeOut',
								},
								x: {
									delay: 1.2,
									duration: 1.5,
									ease: 'easeInOut',
								},
								opacity: { delay: 0.8, duration: 0.8 },
							}}
						>
							{t('title')}
						</motion.h1>
					</div>
				</div>

				<motion.p
					className={`text-xl text-white/70 max-w-3xl mt-6 ${
						isJapanese ? 'font-notoSansJP' : ''
					}`}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 1.5 }}
				>
					{t('subtitle')}
				</motion.p>
			</div>

			<div className="max-w-7xl mx-auto px-6">
				<div className="grid lg:grid-cols-3 gap-12">
					{/* Contact Information */}
					<motion.div
						className="lg:col-span-1 space-y-8"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						{/* Contact Info Cards */}
						<div className="space-y-6">
							<motion.div
								className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.3 }}
							>
								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-gradient-to-br from-[#FF851B] to-[#06B6D4] rounded-xl flex items-center justify-center flex-shrink-0">
										<MapPin className="w-6 h-6 text-white" />
									</div>
									<div>
										<h2
											className={`text-white font-semibold mb-2 ${
												isJapanese
													? 'font-notoSansJP'
													: ''
											}`}
										>
											{t('location')}
										</h2>
										<p
											className={`text-white/70 ${
												isJapanese
													? 'font-notoSansJP'
													: ''
											}`}
										>
											{t('address')}
										</p>
									</div>
								</div>
							</motion.div>
						</div>

						{/* Working Hours */}
						<motion.div
							className="bg-gradient-to-br from-[#4F46E5]/20 to-[#06B6D4]/20 border border-white/10 rounded-2xl p-6"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							<h2
								className={`text-white font-semibold mb-4 ${
									isJapanese ? 'font-notoSansJP' : ''
								}`}
							>
								{t('workingHours')}
							</h2>
							<div
								className={`space-y-2 text-white/70 ${
									isJapanese ? 'font-notoSansJP' : ''
								}`}
							>
								<p>{t('weekdays')}</p>
								<p>{t('weekends')}</p>
							</div>
						</motion.div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						className="lg:col-span-2"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<form
							onSubmit={handleSubmit}
							className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
						>
							<div className="grid md:grid-cols-2 gap-6 mb-6">
								{/* Name */}
								<div>
									<label
										className={`block text-white mb-2 ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
									>
										{t('form.name')} *
									</label>
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										required
										className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-[#06B6D4] focus:outline-none transition-colors ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
										placeholder={t('form.namePlaceholder')}
									/>
								</div>

								{/* Email */}
								<div>
									<label
										className={`block text-white mb-2 ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
									>
										{t('form.email')} *
									</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
										className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-[#06B6D4] focus:outline-none transition-colors ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
										placeholder={t('form.emailPlaceholder')}
									/>
								</div>

								{/* Company */}
								<div>
									<label
										className={`block text-white mb-2 ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
									>
										{t('form.company')}
									</label>
									<input
										type="text"
										name="company"
										value={formData.company}
										onChange={handleChange}
										className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-[#06B6D4] focus:outline-none transition-colors ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
										placeholder={t(
											'form.companyPlaceholder'
										)}
									/>
								</div>

								{/* Project Type */}
								<div>
									<label
										className={`block text-white mb-2 ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
									>
										{t('form.projectType')}
									</label>
									<select
										name="projectType"
										value={formData.projectType}
										onChange={handleChange}
										aria-label={t('form.projectType')}
										className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-[#06B6D4] focus:outline-none transition-colors ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
									>
										<option
											value=""
											className="bg-[#001F3F]"
										>
											{t('form.selectProject')}
										</option>
										<option
											value="wordpress"
											className="bg-[#001F3F]"
										>
											{t('form.wordpress')}
										</option>
										<option
											value="react"
											className="bg-[#001F3F]"
										>
											{t('form.react')}
										</option>
										<option
											value="seo"
											className="bg-[#001F3F]"
										>
											{t('form.seo')}
										</option>
										<option
											value="maintenance"
											className="bg-[#001F3F]"
										>
											{t('form.maintenance')}
										</option>
										<option
											value="other"
											className="bg-[#001F3F]"
										>
											{t('form.other')}
										</option>
									</select>
								</div>

								{/* Budget */}
								<div className="md:col-span-2">
									<label
										className={`block text-white mb-2 ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
									>
										{t('form.budget')}
									</label>
									<select
										name="budget"
										value={formData.budget}
										onChange={handleChange}
										aria-label={t('form.budget')}
										className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-[#06B6D4] focus:outline-none transition-colors ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
									>
										<option
											value=""
											className="bg-[#001F3F]"
										>
											{t('form.selectBudget')}
										</option>
										<option
											value="<500k"
											className="bg-[#001F3F]"
										>
											{t('form.budget1')}
										</option>
										<option
											value="500k-1m"
											className="bg-[#001F3F]"
										>
											{t('form.budget2')}
										</option>
										<option
											value="1m-2m"
											className="bg-[#001F3F]"
										>
											{t('form.budget3')}
										</option>
										<option
											value=">2m"
											className="bg-[#001F3F]"
										>
											{t('form.budget4')}
										</option>
									</select>
								</div>

								{/* Message */}
								<div className="md:col-span-2">
									<label
										className={`block text-white mb-2 ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
									>
										{t('form.message')} *
									</label>
									<textarea
										name="message"
										value={formData.message}
										onChange={handleChange}
										required
										rows={5}
										className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-[#06B6D4] focus:outline-none transition-colors resize-none ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
										placeholder={t(
											'form.messagePlaceholder'
										)}
									/>
								</div>
							</div>

							{/* Submit Button */}
							<div className="flex items-center justify-between">
								<motion.button
									type="submit"
									disabled={isSubmitting}
									className={`inline-flex items-center px-8 py-4 bg-[#FF851B] text-white font-semibold rounded-full hover:bg-[#FF851B]/90 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
										isJapanese ? 'font-notoSansJP' : ''
									}`}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									{isSubmitting
										? t('form.submitting')
										: t('form.submit')}
									<Send className="ml-2 w-5 h-5" />
								</motion.button>

								{/* Status Messages */}
								{submitStatus === 'success' && (
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										className="flex items-center text-green-500"
									>
										<CheckCircle className="w-5 h-5 mr-2" />
										<span
											className={
												isJapanese
													? 'font-notoSansJP'
													: ''
											}
										>
											{t('form.success')}
										</span>
									</motion.div>
								)}

								{submitStatus === 'error' && (
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										className="flex items-center text-red-500"
									>
										<AlertCircle className="w-5 h-5 mr-2" />
										<span
											className={
												isJapanese
													? 'font-notoSansJP'
													: ''
											}
										>
											{t('form.error')}
										</span>
									</motion.div>
								)}
							</div>
						</form>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ContactPage;
