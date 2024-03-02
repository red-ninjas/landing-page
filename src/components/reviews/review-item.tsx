'use client';
import { useTranslation } from '@/i18n/client';
import Avatar from '@himalaya-ui/core/avatar';
import Card from '@himalaya-ui/core/card';
import Grid from '@himalaya-ui/core/grid';
import Link from '@himalaya-ui/core/link';
import Rating from '@himalaya-ui/core/rating';
import Text from '@himalaya-ui/core/text';
import Moment from 'react-moment';
const truncateString = (string: string = '', maxLength: number = 50) =>
  string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

export const ReviewItem = ({ lng, item }: { lng: string; item: any }) => {
  const { t } = useTranslation(lng, 'home');
  return (
    <Card
      style={{
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
      }}
      h={'100%'}
    >
      <Card.Content style={{ height: '100%' }}>
        <Grid.Container alignItems={'center'}>
          <Grid xs>
            <Rating
              type="warning"
              locked
              value={item.rating}
              initialValue={item.rating}
              count={5}
            />
          </Grid>
          <Grid>
            <Text type="secondary" small>
              <Moment fromNow unix>
                {item.time}
              </Moment>
            </Text>
          </Grid>
        </Grid.Container>
        <Link p={0} m={0} target="_blank" href={item.author_url}>
          <Grid.Container mt={1} alignItems={'center'}>
            <Grid mr={0.5} alignItems={'center'}>
              <Avatar
                scale={1.2}
                m={0}
                text={item.author_name.match(/\b\w/g).join('')}
              />
            </Grid>
            <Grid xs>
              <Text m={0}>{item.author_name}</Text>
            </Grid>
          </Grid.Container>
        </Link>
        <Text type="secondary">{truncateString(item.text, 175)}</Text>
      </Card.Content>
      <Card.Footer>
        <Link
          block
          target="_blank"
          href={
            'https://www.google.com/maps/place/RedNinjas+LTD+-+Web+Development+in+Cyprus/@34.9570979,33.6467273,17z/data=!4m14!1m5!8m4!1e1!2s107773075507763491968!3m1!1e1!3m7!1s0x14de29684320033b:0xe3ef356d759eb281!8m2!3d34.9570935!4d33.6493022!9m1!1b1!16s%2Fg%2F11vt6psq2h?entry=ttu'
          }
        >
          {t('reviews.checkout')}
        </Link>
      </Card.Footer>
    </Card>
  );
};
