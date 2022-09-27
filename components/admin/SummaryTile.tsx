import { Grid, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  title: string | number;
  subTitle: string;
  icon: JSX.Element;
}
export const SummaryTile: FC<Props> = ({ title, subTitle, icon }) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent
          sx={{
            width: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </CardContent>
        <CardContent
          sx={{
            flex: '1 o auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant='h3' textAlign='center'>
            {title}
          </Typography>
          <Typography variant='caption' textAlign='center'>
            {subTitle}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
