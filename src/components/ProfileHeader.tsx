
interface ProfileHeaderProps {
  title: string;
  description: string;
}

export const ProfileHeader = ({ title, description }: ProfileHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
