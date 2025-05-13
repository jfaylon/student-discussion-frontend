const DashboardCard: React.FC<{ title: string; value: number }> = ({
  title,
  value,
}) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value ?? "N/A"}</p>
    </div>
  );
};

export default DashboardCard;
