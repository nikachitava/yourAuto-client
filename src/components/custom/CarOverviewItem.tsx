interface ICarOverviewItemProps {
	image: string;
	header: string;
	title: string;
}

const CarOverviewItem: React.FC<ICarOverviewItemProps> = ({
	image,
	header,
	title,
}) => {
	return (
		<div className="inline-flex items-center justify-between w-full">
			<div className="flex items-center gap-3">
				<img src={image} alt={image} />
				<p>{header}</p>
			</div>
			<p className="font-bold">{title}</p>
		</div>
	);
};

export default CarOverviewItem;
