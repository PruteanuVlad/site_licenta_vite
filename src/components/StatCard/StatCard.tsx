/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
// @ts-nocheck
import axios from 'axios';
import { useState, useEffect, SetStateAction } from 'react';
import { Text, rem, Switch, TextInput, useMantineColorScheme, Flex } from '@mantine/core';
import classes from './StatCard.module.css';

export function StatCard({ stat, id_node }) {
    const { colorScheme } = useMantineColorScheme();

    const [upper_lim, setUpperLim] = useState(null);
    const [lower_lim, setLoweLim] = useState(null);

    const dark = colorScheme === 'dark';
    useEffect(() => {
      document.documentElement.style.setProperty('--paper-bg-color', dark ? '#495057' : '#ffffff');
      document.documentElement.style.setProperty('--main-bg-color', dark ? '#373A40' : '#099cff');
    }, [dark]);

    const postLimits = async (type, val) => {
        try {
            const response = await axios.post('https://site-licenta-10aff3814de1.herokuapp.com/add_limit', {
                nodeId: id_node,
                prop: stat.db,
                type,
                val,
            });
            window.console.log(response);
        } catch (error) {
            window.console.log(error);
        }
    };

    const [value, setValue] = useState(0);
    const modifyValue = (amount: SetStateAction<number>) => {
      setValue(amount);
      console.log(amount);
    };
    const modifyLimInf = (amount: SetStateAction<number>) => {
        console.log(amount);
        postLimits('inf', amount);
      };
    const modifyLimSup = (amount: SetStateAction<number>) => {
        console.log(amount);
        postLimits('sup', amount);
    };
    const [indiceCategorie, setIndiceCategorie] = useState(0);
    const modifyIndiceCategorie = (amount: number) => {
      if (indiceCategorie + amount >= 0 && indiceCategorie + amount < categorii.length) {
        setIndiceCategorie(indiceCategorie + amount);
      }
    };
    const [perioadaTimp, setPerioadaTimp] = useState(0);

    const rightSideCelsius = (
      <div style={{ textAlign: 'right', fontSize: '18px' }}>
        <p>°C</p>
      </div>
    );

    return (
    <>
        <div className={classes.statStyle}>
            <Flex
              mih={50}
              gap="md"
              justify="center"
              align=" center"
              direction="row"
              wrap="wrap"
            >
                <div>
                <stat.icon
                  style={{ width: rem(32), height: rem(32) }}
                  className={classes.icon}
                  stroke={1.5}
                />
                    <Text className={classes.label}>{stat.label}</Text>
                    <Text className={classes.count}>
                    <span className={classes.value}>{stat.value + stat.sufix}</span>
                    </Text>
                    {(stat.label == 'Temperatură') && (
                    <TextInput
                      value={value}
                      onChange={(event) => modifyValue(parseInt(event.currentTarget.value, 10))}
                      style={{ width: '70px' }}
                      type="number"
                      styles={(theme) => ({
                        label: {
                            whiteSpace: 'nowrap',
                        },
                        })}
                      placeholder="24"
                      label="Temp. dorită:"
                      rightSection={rightSideCelsius}
                      rightSectionWidth={30}
                    />
                    )}
                    {(stat.label == 'Lumină') && (
                    <Switch
                      defaultChecked
                    />
                    )}
                </div>
                <div>
                    {(stat.label != 'Ușă') && (
                    <TextInput
                      value={lower_lim}
                      onChange={(event) => modifyLimInf(parseInt(event.currentTarget.value, 10))}
                      style={{ width: '70px' }}
                      type="number"
                      placeholder={stat.lower_lim}
                      styles={(theme) => ({
                        label: {
                            whiteSpace: 'nowrap',
                        },
                        })}
                      label="Lim. inf."
                      rightSection={stat.sufix}
                      rightSectionWidth={30}
                    />
                    )}
                    {(stat.label != 'Ușă') && (
                    <TextInput
                      value={upper_lim}
                      onChange={(event) => modifyLimSup(parseInt(event.currentTarget.value, 10))}
                      style={{ width: '70px' }}
                      type="number"
                      placeholder={stat.upper_lim}
                      styles={(theme) => ({
                        label: {
                            whiteSpace: 'nowrap',
                        },
                        })}
                      label="Lim. sup."
                      rightSection={stat.sufix}
                      rightSectionWidth={30}
                    />
                    )}
                </div>
            </Flex>
        </div>
    </>
    );
}

export default StatCard;
