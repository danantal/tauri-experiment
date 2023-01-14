import { Fragment, FC } from "react";
import {
  Alert,
  AlertIcon,
  Divider,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { FileIcon } from "@radix-ui/react-icons";

export type FileListProps = { files: string[] };

export const FileList: FC<FileListProps> = ({ files }) => {
  if (files.length === 0) {
    return (
      <Alert status="info" p={8} alignItems="center" justifyContent="center">
        <AlertIcon />
        No files selected. Add some files to get started
      </Alert>
    );
  }

  return (
    <List spacing={4}>
      {files.map((file) => (
        <Fragment key={file}>
          <ListItem display={"flex"} alignItems="center">
            <ListIcon as={FileIcon} width={6} height={6} />
            <Text display={"inline"} fontSize={"sm"} color="gray.600">
              {file}
            </Text>
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};
