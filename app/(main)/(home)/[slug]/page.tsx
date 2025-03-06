import { getRecommended } from "@/lib/recommended-service"

export const generateStaticParams = async () => {
  const users = await getRecommended()

  return users.map((user) => ({
    slug: user.username,
  }))
}

interface UserPageProps {
  params: {
    slug: string
  }
}

const UserPage = ({ params }: UserPageProps) => {
  return <div>{params.slug}</div>
}

export default UserPage
