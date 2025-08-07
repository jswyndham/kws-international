export default function StudioLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="m-0">{children}</body>
		</html>
	);
}
