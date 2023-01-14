import { FC, useState } from "react";
import { Alert, AlertIcon, Button, Flex, VStack } from "@chakra-ui/react";
import { builder, processSpreadsheet } from "./WorkbookBuilder";
import { useStore } from "./store";

import { save } from "@tauri-apps/api/dialog";
import { writeBinaryFile } from "@tauri-apps/api/fs";

export const FileProcessor: FC = () => {
  const files = useStore((state) => state.files);
  const [processingState, setProcessingState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const processFiles = async () => {
    try {
      setProcessingState("loading");

      for (const file of files) {
        await processSpreadsheet(file);
      }

      builder.build();
      setProcessingState("success");
    } catch (error) {
      setProcessingState("error");
      console.error({ error });
      builder.reset();
    }
  };

  const saveReport = async () => {
    const filePath = await save({
      title: "Save report",
      filters: [
        {
          name: "Report",
          extensions: ["xlsx"],
        },
      ],
    });

    if (filePath == null) {
      return;
    }

    await writeBinaryFile(filePath, builder.data);
    builder.reset();
    setProcessingState("idle");
  };

  return (
    <VStack gap={4}>
      <Button
        colorScheme={"blue"}
        onClick={processFiles}
        disabled={files.length === 0}
        isLoading={processingState === "loading"}
      >
        Process files
      </Button>
      {processingState === "success" && (
        <Alert
          status="success"
          justifyContent={"center"}
          alignItems="center"
          flexDirection={"column"}
          gap={4}
          p={8}
        >
          <Flex>
            <AlertIcon />
            The files have been merged succesfully
          </Flex>
          <Button variant={"link"} colorScheme="blue" onClick={saveReport}>
            Save report
          </Button>
        </Alert>
      )}
      {processingState === "error" && (
        <Alert
          status="error"
          justifyContent={"center"}
          alignItems="center"
          flexDirection={"column"}
          gap={4}
          p={8}
        >
          <Flex>
            <AlertIcon />
            Something went wrong. Please check the selected files and try again.
          </Flex>
        </Alert>
      )}
    </VStack>
  );
};
