import { useEffect, useMemo, useState } from "react";
import Switch from "./common/Switch";
import { BodyCellComponentProps, TableColumn } from "../types";
import Table from "./common/Table";
import Select from "./common/Select";
import { Key } from "react-aria";
import {
  useGetChannelsQuery,
  useGetHotelsQuery,
  useUpdateChannelMutation,
} from "../store/api";
import { BeatLoader, GridLoader } from "react-spinners";

interface ChannelTableRow {
  [k: string]: string | number;
  id: string;
  name: string;
  visible: "true" | "false";
}

export default function ChannelManager() {
  const [selectedHotelID, setSelectedHotelID] = useState<Key | undefined>();
  const [channelToUpdate, setChannelToUpdate] = useState<string | undefined>();

  const {
    data: hotels,
    isLoading: isLoadingHotels,
    isError: isErrorHotels,
    error: errorHotels,
  } = useGetHotelsQuery();
  const {
    data: channels,
    isLoading: isLoadingChannels,
    isError: isErrorChanels,
    error: errorChannels,
  } = useGetChannelsQuery();
  const [updateChannel, { isLoading: isUpdating }] = useUpdateChannelMutation();

  useEffect(() => {
    if (hotels && hotels.length > 0) setSelectedHotelID(hotels[0]._id);
  }, [hotels]);

  const hotelListItems: { id: Key; label: string }[] = useMemo(() => {
    return hotels?.map(({ _id, name }) => ({ id: _id, label: name })) ?? [];
  }, [hotels]);

  function isVisibe(channelID: string) {
    const channel = channels?.find(({ _id }) => _id === channelID);
    return channel?.hotels.includes(selectedHotelID?.toString() ?? "");
  }

  const channelTableRows: ChannelTableRow[] = useMemo(() => {
    return (
      channels?.map(({ _id, name }) => ({
        id: _id,
        name,
        visible: isVisibe(_id) ? "true" : "false",
      })) ?? []
    );
  }, [channels, selectedHotelID]);

  function showSwitchLoadingSpinner(channelID: string) {
    return isUpdating && channelID === channelToUpdate;
  }

  function handleVisibilityChange(channelID: string) {
    setChannelToUpdate(channelID);
    function removeHotel(list: string[]) {
      return list.filter((listItem) => listItem !== selectedHotelID);
    }
    function addHotel(list: string[]) {
      return selectedHotelID ? [...list, selectedHotelID?.toString()] : list;
    }
    const channel = channels?.find(({ _id }) => _id === channelID);
    if (!channel || !selectedHotelID) {
      return;
    }
    const updatedHotelsList = isVisibe(channelID)
      ? removeHotel(channel.hotels)
      : addHotel(channel.hotels);
    const updatedChannel = { ...channel, hotels: updatedHotelsList };
    updateChannel(updatedChannel);
  }

  const columns: TableColumn<ChannelTableRow>[] = [
    {
      id: "name",
      title: "Channel",
      align: "left",
      isRowHeader: true,
      minWidth: 180,
    },
    {
      id: "visible",
      title: "Visibility",
      align: "right",
      bodyCellComponent: (props: BodyCellComponentProps<ChannelTableRow>) => (
        //button as workaround to be able to focus
        <button
          className="flex justify-end w-full h-[24px] items-center"
          onClick={() => handleVisibilityChange(props.rowID)}
        >
          {showSwitchLoadingSpinner(props.rowID) ? (
            <BeatLoader size={10} color="#c3d4e8" />
          ) : (
            <Switch
              isSelected={props.value === "true"}
              onChange={() => handleVisibilityChange(props.rowID)}
            />
          )}
        </button>
      ),
    },
  ];

  const showPageLoader = isLoadingChannels || isLoadingHotels;

  const columns2: TableColumn<{
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    occupation: string;
  }>[] = [
    {
      id: "firstName",
      title: "Girst Name",
      align: "left",
      isRowHeader: true,
    },
    {
      id: "lastName",
      title: "Last Name",
      align: "left",
      isRowHeader: true,
    },
    {
      id: "age",
      title: "Age",
      align: "right",
    },
    {
      id: "occupation",
      title: "Occupation",
      align: "left",
    },
  ];

  const data1: {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    occupation: string;
  }[] = [
    {
      id: "1",
      firstName: "Venla",
      lastName: "Väärälä",
      age: 28,
      occupation: "IT Consultant",
    },
    {
      id: "2",
      firstName: "Johannes",
      lastName: "Rantala",
      age: 28,
      occupation: "IT Consultant",
    },
    {
      id: "3",
      firstName: "Maarit",
      lastName: "Väärälä",
      age: 55,
      occupation: "Palveluneuvoja",
    },
  ];

  return (
    <div>
      {showPageLoader && (
        <div
          className="flex justify-center items-center mt-10"
          aria-label="loading"
        >
          <GridLoader color="#0050ff" size={24} />
        </div>
      )}
      {hotels && channels && (
        <div className="p-6 flex flex-col gap-y-5 max-w-[800px] min-w-[290px]">
          <h1 className="text-2xl">Channel Manager</h1>
          <Select
            options={hotelListItems}
            onSelectionChange={setSelectedHotelID}
            selectedOptionId={selectedHotelID}
          />
          <Table
            data={channelTableRows}
            columns={columns}
            tableName="Hotel visibility list"
          />
        </div>
      )}
    </div>
  );
}
