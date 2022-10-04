import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_GROUP } from "@/query/groupDataQuery";
import clsx from "clsx";

export async function getServerSideProps({ query }) {
  const groupId = query.id;
  return {
    props: { groupId },
  };
}

const GroupDetails = ({ groupId }: { groupId: string }) => {
  const [settingOpen, setSettingOpen] = useState(false);
  const [editGroupName, setEditGroupName] = useState(false);
  const [editGroupDescription, setEditGroupDescription] = useState(false);
  const [editGroupImage, setEditGroupImage] = useState(false);

  const { data } = useSubscription(GET_GROUP, {
    variables: { id: groupId },
  });

  const { description, image, name, ownerId } = data?.itemGroup[0] ?? [];

  return (
    <div className="mx-16">
      <div className="flex gap-x-12 items-center mb-16">
        <div className="text-2xl font-semibold text-gray-600">{name}</div>
        <button
          className="text-sm bg-gray-200 px-6 py-2 text-gray-500"
          onClick={() => setSettingOpen(!settingOpen)}
        >
          Settings
        </button>
      </div>
      {settingOpen && (
        <div className="max-w-[525px] w-full flex flex-col space-y-3">
          <div className="flex items-center justify-between h-[45px] gap-x-4">
            <input
              type="text"
              value={name}
              className={clsx("h-full bg-gray-200 pl-6 text-gray-400 w-10/12", {
                "text-gray-600": editGroupName,
              })}
              disabled={!editGroupName}
            />
            <button
              onClick={() => setEditGroupName(!editGroupName)}
              className="bg-gray-200 text-gray-600 h-full px-4 w-2/12"
            >
              {editGroupName ? "Save" : "Edit"}
            </button>
          </div>

          <div className="flex items-center justify-between h-[45px] gap-x-4">
            <input
              type="text"
              value={description}
              className={clsx("h-full bg-gray-200 pl-6 text-gray-400 w-10/12", {
                "text-gray-600": editGroupDescription,
              })}
              disabled={!editGroupDescription}
            />
            <button
              onClick={() => setEditGroupDescription(!editGroupDescription)}
              className="bg-gray-200 text-gray-600 h-full px-4 w-2/12"
            >
              {editGroupDescription ? "Save" : "Edit"}
            </button>
          </div>
          <input
            type="file"
            onChange={(e) => setEditGroupImage(e.target.files[0])}
            accept="image/*"
            className={clsx("h-full", {
              "text-gray-600": editGroupName,
            })}
            disabled={!editGroupName}
          />
        </div>
      )}

      {!settingOpen && (
        <div className="bg-gray-200 p-6 inline-flex flex-col">
          <h4 className="text-xl text-gray-500 font-semibold w-10/12">
            Look like you don&apos;t have any item yet
          </h4>
          <div className="mt-12">
            <button className="bg-orange-400 text-orange-50 py-2 px-4">
              Add item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetails;
