import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiPlus } from "react-icons/hi";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_GROUP, CREATE_GROUP } from "@/query/groupDataQuery";
import { useUserData, useNhostClient } from "@nhost/nextjs";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

const DashboardPage = () => {
  const user = useUserData();
  const nhost = useNhostClient();
  const [createGroup] = useMutation(CREATE_GROUP);

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { loading, error, data } = useQuery(GET_ALL_GROUP, {
    variables: { userId: user?.id },
  });

  let groupData = data?.itemGroup ?? [];

  const CreateGroupHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Im typing", groupImage);
    if (!user) return;

    const fileUploadRes = await nhost.storage.upload({
      file: groupImage,
      bucketId: "group_images_bucket",
    });

    if (fileUploadRes.error) {
      return alert(`error uploading file: ${fileUploadRes.error}`);
    }

    console.log("fileUploadRes", fileUploadRes);

    const publicUrl = nhost.storage.getPublicUrl({
      fileId: fileUploadRes.fileMetadata.id,
    });

    console.log("url: ", publicUrl);

    return createGroup({
      variables: {
        object: {
          name: groupName,
          description: groupDescription,
          image: publicUrl,
        },
      },
    });
  };

  console.log("groupData", groupData);

  return (
    <div className="px-10">
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-4">
          <div className="text-2xl text-gray-400">Add Group</div>
          <button className="bg-gray-400 p-2 rounded-full" onClick={openModal}>
            <HiPlus />
          </button>
        </div>
        <div>
          {groupData.map((group, idx) => (
            <Link href={`/dashboard/group-details/${group.id}`} key={idx}>
              <div className="bg-gray-200 inline-block min-w-[325px]">
                <div className="relative w-full h-[200px]">
                  <Image
                    src={group.image}
                    layout="fill"
                    alt=""
                    objectFit="cover"
                  />
                </div>
                <div className="text-gray-600 text-xl font-semibold">
                  {group.name}
                </div>
                <div className="text-gray-500 mt-2">{group.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Group
                  </Dialog.Title>
                  <form onSubmit={CreateGroupHandler}>
                    <div className="bg-gray-200 h-[45px] mt-4">
                      <input
                        placeholder="group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        type="text"
                        required
                        className="bg-transparent pl-4 h-full w-full text-gray-500"
                      />
                    </div>
                    <div className="bg-gray-200 h-[45px] mt-4">
                      <input
                        placeholder="group description"
                        value={groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                        type="text"
                        className="bg-transparent pl-4 h-full w-full text-gray-500"
                      />
                    </div>
                    <input
                      type="file"
                      onChange={(e) => setGroupImage(e.target.files[0])}
                      accept="image/*"
                    />
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-6"
                    >
                      Create Group
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DashboardPage;
