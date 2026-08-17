import {Box, Button, Checkbox, Divider, Field, Flex, Main, Modal, Typography} from "@strapi/design-system";
import { useIntl } from "react-intl";

import { getTranslation } from "../utils/getTranslation";

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main padding={8}>
      <Box>
        <Typography variant="beta" as="h1">
          {formatMessage({ id: getTranslation('welcome.message'), defaultMessage: 'Welcome to' })}&nbsp;
          {formatMessage({ id: getTranslation('plugin.name'), defaultMessage: 'Club Export Data Plugin' })}
        </Typography>
        <Typography variant="omega" as="p">
          {formatMessage({
            id: getTranslation('welcome.description'),
            defaultMessage: 'Configure the display of the Export or Import button using the desired Collection through the options below'
          })}
        </Typography>
      </Box>
      <Box paddingTop={4} paddingBottom={4}>
        <Divider />
      </Box>
    </Main>
  );
};

export { HomePage };
