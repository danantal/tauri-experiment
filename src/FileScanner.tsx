import { useState, FC } from "react";
import { open } from "@tauri-apps/api/dialog";
import { homeDir } from "@tauri-apps/api/path";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { FileList } from "./FileList";
import { useStore } from "./store";

export const FileScanner: FC = () => {
  const { files, addFiles, clear } = useStore();

  const handleChooseFiles = async () => {
    const selected = await open({
      multiple: true,
      defaultPath: await homeDir(),
      filters: [
        {
          name: "Spreadsheet",
          extensions: ["xls", "xlsx", "xlsb"],
        },
      ],
    });

    if (selected == null) {
      return;
    } else {
      const newFiles = Array.isArray(selected) ? selected : [selected];
      addFiles(newFiles);
    }
  };

  return (
    <VStack gap={4} alignItems={"stretch"}>
      <FileList files={files} />
      <HStack justifyContent={"flex-end"}>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={handleChooseFiles}
        >
          Add files
        </Button>
        <Button onClick={clear} colorScheme={"red"} variant="outline">
          Clear
        </Button>
      </HStack>
    </VStack>
  );
};
