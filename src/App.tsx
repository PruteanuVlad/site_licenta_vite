import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@bdhamithkumara/react-push-notification';
import { Router } from './Router';

export default function App() {
  return (
    <MantineProvider>
      <Router />
      <Notifications />
    </MantineProvider>
  );
}
