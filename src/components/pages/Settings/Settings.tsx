import { FC, ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import {
  Subtitle,
  Paragraph,
  CountriesDropdown,
  Toggle,
} from '@components/atoms/index';
import { Close, PersonWalking, CarSide } from '@icons/index';
import { DistanceSlider, IconLink } from '@components/molecules/index';
import { radiusAtom, countryAtom, openNowAtom } from '@recoil/index';
import { routes } from '@constants/index';
import { Layout } from '@components/templates/index';
import styles from './Settings.module.scss';

const { SELECT_LOCATION } = routes;

const Settings: FC = () => {
  const [country, setCountry] = useRecoilState(countryAtom);
  const [radius, setRadius] = useRecoilState(radiusAtom);
  const [openNow, setOpenNow] = useRecoilState(openNowAtom);

  const onToggleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpenNow(!e.target.checked);
  };

  const valueLabelFormat = (value: number) => {
    if (value < 1000) {
      return `${value} m`;
    }
    return `${value / 1000} km`;
  };

  const getETA = (distance: number) => {
    let icon = <CarSide />;
    let divider = 30000;
    if (distance <= 1000) {
      icon = <PersonWalking />;
      divider = 5000;
    }
    return (
      <span>
        &#40; {icon}
        {` ~ ${Math.round((distance * 60) / divider)}min)`}
      </span>
    );
  };

  return (
    <Layout className={styles.Settings}>
      <Subtitle className={styles.Settings__Subtitle}>
        ¿En que país te encuentras?
      </Subtitle>
      <CountriesDropdown
        className={styles.Settings__Dropdown}
        onSelect={setCountry}
        selected={country}
      />
      <Subtitle className={styles.Settings__Subtitle}>
        ¿Que tanto queremos caminar?
      </Subtitle>
      <Paragraph>
        {valueLabelFormat(radius)} {getETA(radius)}
      </Paragraph>
      <DistanceSlider
        className={styles.Settings__Slider}
        value={radius / 100}
        onChange={setRadius}
      />
      <Subtitle className={styles.Settings__Subtitle}>
        ¿Quieres ver restaurantes que estén cerrados?
      </Subtitle>
      <span className={styles.Settings__Toggle}>
        <Paragraph>No</Paragraph>
        <Toggle checked={!openNow} onChange={onToggleChange} />
        <Paragraph>Sí</Paragraph>
      </span>
      <IconLink
        to={SELECT_LOCATION}
        Icon={Close}
        className={styles.Settings__Close}
      >
        Volver atrás
      </IconLink>
    </Layout>
  );
};

export default Settings;
