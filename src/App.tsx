import { Grid, GridItem } from "@chakra-ui/react";
import { FileScanner } from "./FileScanner";
import { FileProcessor } from "./FileProcessor";

function App() {
  return (
    <Grid templateColumns="repeat(12, 1fr)" height="100%">
      <GridItem
        colSpan={6}
        p={6}
        bg="gray.50"
        borderRightColor={"gray.200"}
        borderRightWidth={"1px"}
      >
        <FileScanner />
      </GridItem>
      <GridItem colSpan={6} p={6} bg="blue.50">
        <FileProcessor />
      </GridItem>
    </Grid>
  );
}

export default App;
