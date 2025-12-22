import {
  Card,
  Typography,
  Switch,
  Stack,
  Divider,
} from "@mui/material";

const SettingsPage = () => {
  return (
    <Card sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Admin Settings
      </Typography>

      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Enable Maintenance Mode</Typography>
          <Switch />
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Typography>Allow New Registrations</Typography>
          <Switch defaultChecked />
        </Stack>
      </Stack>
    </Card>
  );
};

export default SettingsPage;
