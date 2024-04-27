/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
// @ts-nocheck
import { useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Text, Group, Space, UnstyledButton, Paper, rem, Grid, Switch, TextInput, useMantineColorScheme } from '@mantine/core';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  IconMist,
  IconSun,
  IconTemperature,
  IconChevronRight,
  IconChevronLeft,
  IconDropletHalf2Filled,
  IconLock,
} from '@tabler/icons-react';
import classes from './NodeCard.module.css';

export function NodeCard({ idNod }) {
    const [temperatura, setTemperatura] = useState(false);
    const [umiditate, setUmiditate] = useState(false);
    const [lumina, setLumina] = useState(false);
    const [apa, setApa] = useState(false);
    const [usa, setUsa] = useState(false);
    const [xValues_n, setXValues_n] = useState(false);
    const [yValues_n, setYValues_n] = useState(false);
    const { colorScheme } = useMantineColorScheme();
    const [noduri, setNoduri] = useState(null);
    useEffect(() => {
      // Obtinerea id-urilor nodurilor
      const fetchNoduri = async () => {
        try {
          const response = await axios.get('https://site-licenta-10aff3814de1.herokuapp.com/noduri');
          setNoduri(response.data.id_nod);
          window.console.log('test');
        } catch (error) {
          window.console.log('eroare');
        }
      };
      fetchNoduri();
    }, []);
    const dark = colorScheme === 'dark';
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      zoomPlugin,
    );
    const options = {
      responsive: true,
      scales: {
        x: {
          ticks: {
            stepSize: 1,
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
          },
        },
      },
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
        },
        zoom: {
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'x',
          },
        },
      },
    };
    const test = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const data = [
      { icon: IconTemperature, label: 'Temperatură', value: temperatura, sufix: '°C' },
      { icon: IconMist, label: 'Umiditate', value: umiditate, sufix: '%' },
      { icon: IconSun, label: 'Lumină', value: lumina, sufix: ' lm' },
      { icon: IconDropletHalf2Filled, label: 'Apă', value: lumina, sufix: '' },
      { icon: IconLock, label: 'Ușă', value: lumina, sufix: '' },
    ];
    useEffect(() => {
      // Fetch data from API 1
      const fetchData1 = async () => {
        try {
          const response = await axios.get(`https://site-licenta-10aff3814de1.herokuapp.com/temperatura?time=current&idNod=${idNod}`);
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
          const response = await axios.get(`https://site-licenta-10aff3814de1.herokuapp.com/umiditate?time=current&idNod=${idNod}`);
          setUmiditate(response.data.umiditate);
        } catch (error) {
          console.error('Error fetching data from API 2:', error);
        }
      };
      fetchData2();
    }, []);
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'Enter') {
        // Handle Enter key press
        console.log('Enter key pressed');
        // You can perform any actions or submit the form here
      }
    };
    const categorii = ['Temperatură', 'Umiditate'];
    const coloane_sql = ['temperatura', 'umiditate'];
    const [value, setValue] = useState(0);
    const modifyValue = (amount: SetStateAction<number>) => {
      setValue(amount);
      console.log(amount);
    };
    const [indiceCategorie, setIndiceCategorie] = useState(0);
    const modifyIndiceCategorie = (amount: number) => {
      if (indiceCategorie + amount >= 0 && indiceCategorie + amount < categorii.length) {
        setIndiceCategorie(indiceCategorie + amount);
      }
    };
    const [perioadaTimp, setPerioadaTimp] = useState(0);
    const perioadeTimp = ['day', 'week', 'month', 'year'];
    const data1 = {
      labels: xValues_n,
      datasets: [
        {
          label: categorii[indiceCategorie],
          data: yValues_n,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    const rightSideCelsius = (
      <div style={{ textAlign: 'right', fontSize: '18px' }}>
        <p>°C</p>
      </div>
    );
    useEffect(() => {
      // Fetch data from API 3
      console.log('test');
      const fetchData3 = async () => {
        try {
          const response = await axios.get(`https://site-licenta-10aff3814de1.herokuapp.com/${coloane_sql[indiceCategorie]}?time=${perioadeTimp[perioadaTimp]}&idNod=${idNod}`);
          setXValues_n(response.data.date);
          setYValues_n(response.data.temperatura);
          console.log(perioadeTimp[perioadaTimp]);
        } catch (error) {
          console.error('Error fetching data from API 2:', error);
        }
      };

      fetchData3();
    }, [perioadaTimp]);
    const statStyle = {
      backgroundColor: dark ? '#5c5f66' : '#FFFFFF',
    };
    const stats = data.map((stat) => (
      <Paper className={classes.stat} radius="md" shadow="md" p="xs" key={stat.label} style={statStyle}>
        <stat.icon
          style={{ width: rem(32), height: rem(32) }}
          className={classes.icon}
          stroke={1.5}
        />
        <div>
          <Text className={classes.label}>{stat.label}</Text>
          <Text fz="xs" className={classes.count}>
            <span className={classes.value}>{stat.value + stat.sufix}</span>
          </Text>
          {(stat.label == 'Lumină') && (
            <Switch
              defaultChecked
            />
          )}
          {(stat.label == 'Temperatură') && (
            <TextInput
              value={value}
              onChange={(event) => modifyValue(parseInt(event.currentTarget.value, 10))}
              style={{ width: '80px' }}
              type="number"
              placeholder="24"
              label="Temperatura dorită:"
              rightSection={rightSideCelsius}
              rightSectionWidth={30}
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
      </Paper>
    ));
    const divStyle = {
      backgroundColor: dark ? '#373A40' : '#099cff',
    };
    window.console.log(idNod);
    return (
      <>
        <div className={classes.root} style={divStyle}>
        <Grid>
          <Grid.Col span="auto">
            <Group justify="space-between">
              <Group>
                <UnstyledButton
                  className={classes.control}
                  onClick={() => modifyIndiceCategorie(-1)}
                >
                  <IconChevronLeft
                    style={{ width: rem(16), height: rem(16) }}
                    className={classes.controlIcon}
                    stroke={1.5}
                  />
                </UnstyledButton>
                <Text>{categorii[indiceCategorie]}</Text>
                <UnstyledButton
                  className={classes.control}
                  onClick={() => modifyIndiceCategorie(1)}
                >
                  <IconChevronRight
                    style={{ width: rem(16), height: rem(16) }}
                    className={classes.controlIcon}
                    stroke={1.5}
                  />
                </UnstyledButton>
              </Group>
              <Text>{categorii[indiceCategorie]}</Text>
              <Text>{'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}</Text>
            </Group>
            <Group>
              <UnstyledButton
                className={classes.control}
                onClick={() => setPerioadaTimp(0)}
              >
                <Text>24H</Text>
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                onClick={() => setPerioadaTimp(1)}
              >
                <Text>1W</Text>
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                onClick={() => setPerioadaTimp(2)}
              >
                <Text>1M</Text>
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                onClick={() => setPerioadaTimp(3)}
              >
                <Text>1Y</Text>
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                //onClick={() => setPerioadaTimp(4)}
              >
                <Text>Custom</Text>
              </UnstyledButton>
            </Group>
            <Line options={options} data={data1} />
          </Grid.Col>
          <Grid.Col span={5}>
            <Group style={{ flex: 1 }}>
              {stats}
            </Group>
          </Grid.Col>
        </Grid>
        </div>
        <Space h="xl" />
      </>
    );
}

export default NodeCard;
