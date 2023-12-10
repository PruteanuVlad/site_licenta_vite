import { useState, useEffect } from 'react';
//import { Welcome } from '../components/Welcome/Welcome';\
import axios from 'axios';
import Plot from 'react-plotly.js';
import { Card, Text, Group, Space, Flex, Button } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
// eslint-disable-next-line import/extensions
import { Header } from '@/components/Header/Header';

export function HomePage() {
const [temperatura, setTemperatura] = useState(false);
const [umiditate, setUmiditate] = useState(false);


useEffect(() => {
  // Fetch data from API 1
  const fetchData1 = async () => {
    try {
      const response = await axios.get('https://site-licenta-10aff3814de1.herokuapp.com/temperatura');
      setTemperatura(response.data.temperatura);
    } catch (error) {
      console.error('Error fetching data from API 1:', error);
    }
  };

  fetchData1();
}, []);

useEffect(() => {
  // Fetch data from API 2
  const fetchData2 = async () => {
    try {
      const response = await axios.get('https://site-licenta-10aff3814de1.herokuapp.com/umiditate');
      setUmiditate(response.data.umiditate);
    } catch (error) {
      console.error('Error fetching data from API 2:', error);
    }
  };

  fetchData2();
}, []);
const yValues = [25.34, 25.82, 26.57, 25.89, 26.12, 25.33, 25.49, 26.18, 26.49, 26.29];
const xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <Header />
      <Space h="lg" />
      <Group>
      <Space w="xs" />
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Group justify="space-between" mb="xs">
          <Text fw={500} style={{ fontSize: 20 }}>Temperatură</Text>
        </Group>

        <Text style={{ fontSize: 18 }}>
        {temperatura}°C
        </Text>

      </Card>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Group justify="space-between" mb="xs">
          <Text fw={500} style={{ fontSize: 20 }}>Umiditate</Text>
        </Group>

        <Text style={{ fontSize: 18 }}>
        {umiditate}%
        </Text>

      </Card>
      </Group>
      <Space h="md" />
      <Group>
        <Card shadow="sm" radius="md" withBorder>
          {xValues.length > 0 ? (
            <Plot
              data={[
                {
                  x: xValues,
                  y: yValues,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'red' },
                },
              ]}
              layout={{
                title: 'Grafic temperatură',
                xaxis: {
                  title: 'Axul central',
                },
                yaxis: {
                  title: 'Temperatură (°C)',
                },
                margin: {
                  t: 40,
                  l: 60,
                  r: 0,
                  b: 40,
                },
              }}
              config={{ responsive: true,
                displaylogo: false,
                modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'select2d', 'autoScale2d', 'resetViews', 'zoom2d', 'resetScale2d', 'toImage'] }}
            />
          ) : (
            <p>Loading temperature data...</p>
          )}
        </Card>
        <Card shadow="sm" radius="md" withBorder h={160}>
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: 'lg' }}
            justify={{ sm: 'center' }}
          >
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          </Flex>
        </Card>
      </Group>
      <ColorSchemeToggle />
    </>
  );
}
