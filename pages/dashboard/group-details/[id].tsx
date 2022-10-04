import { useState, useRef } from "react";
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

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  return (
    <div className="mx-16">
      <div className="flex gap-x-12 items-center mb-16">
        <div className="text-3xl font-semibold text-orange-600">{name}</div>
        <button
          className="text-sm bg-gray-200 px-6 py-2 text-gray-500"
          onClick={() => setSettingOpen(!settingOpen)}
        >
          {settingOpen ? "Close" : "Setting"}
        </button>
      </div>
      {settingOpen && (
        <div className="max-w-[525px] w-full border p-6 rounded-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between h-[45px] gap-x-4">
              <input
                type="text"
                value={name}
                className={clsx(
                  "h-full bg-gray-200 pl-6 text-gray-400 w-10/12 rounded-lg",
                  {
                    "text-gray-600": editGroupName,
                  }
                )}
                disabled={!editGroupName}
              />
              <button
                onClick={() => setEditGroupName(!editGroupName)}
                className={clsx(
                  "border h-full px-4 w-2/12 rounded-lg",
                  {
                    "bg-gray-400 text-gray-100 border-gray-400": editGroupName,
                  },
                  {
                    "hover:bg-gray-200 hover:text-gray-600 text-gray-400 ":
                      !editGroupName,
                  }
                )}
              >
                {editGroupName ? "Save" : "Edit"}
              </button>
            </div>

            <div className="flex items-center justify-between h-[45px] gap-x-4">
              <input
                type="text"
                value={description}
                className={clsx(
                  "h-full bg-gray-200 pl-6 text-gray-400 w-10/12 rounded-lg",
                  {
                    "text-gray-600": editGroupDescription,
                  }
                )}
                disabled={!editGroupDescription}
              />

              <button
                onClick={() => setEditGroupDescription(!editGroupDescription)}
                className={clsx(
                  "border h-full px-4 w-2/12 rounded-lg",
                  {
                    "bg-gray-400 text-gray-100 border-gray-400":
                      editGroupDescription,
                  },
                  {
                    "hover:bg-gray-200 hover:text-gray-600 text-gray-400 ":
                      !editGroupDescription,
                  }
                )}
              >
                {editGroupDescription ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={handleClick}
              className="border h-[45px] px-4 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 hover:border-gray-200"
            >
              Update group image
            </button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      )}

      {!settingOpen && (
        <div className="bg-gray-200 bg-opacity-40 p-10 inline-flex flex-col rounded-2xl border">
          <h4 className="text-xl text-gray-500 font-semibold w-10/12">
            Look like you don&apos;t have any item yet
          </h4>
          <div className="mt-12">
            <button className="bg-orange-400 text-orange-50 py-2 px-4 rounded-xl h-[45px]">
              Add item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetails;
