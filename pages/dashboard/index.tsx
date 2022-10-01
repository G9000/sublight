import { HiPlus } from "react-icons/hi";
import { useQuery } from "@apollo/client";
import { GET_GROUP } from "@/query/groupDataQuery";
import { useUserData } from "@nhost/nextjs";

const DashboardPage = () => {
  const user = useUserData();
  console.log("user", user);
  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: { userId: user?.id },
  });

  let groupData = data?.itemGroup ?? [];

  console.log("groupData", groupData);

  return (
    <div className="px-10">
      <div className="flex items-center gap-x-4">
        <div className="text-2xl text-gray-400">Add Group</div>
        <button className="bg-gray-400 p-2 rounded-full">
          <HiPlus />
        </button>
        {groupData.map((group, idx) => (
          <div key={idx}>
            <div>{group.name}</div>
            <div>{group.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
