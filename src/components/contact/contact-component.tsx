'use client';
import { useTranslation } from '@/i18n/client';
import Button from '@himalaya-ui/core/button';
import Grid from '@himalaya-ui/core/grid';
import Input from '@himalaya-ui/core/input';
import PageWidth from '@himalaya-ui/core/page-width';
import Section from '@himalaya-ui/core/section';
import Text from '@himalaya-ui/core/text';
import Textarea from '@himalaya-ui/core/textarea';
import useTheme from '@himalaya-ui/core/use-theme';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EntryAnimation } from '../animations/entry-animation';
import { useState } from 'react';
import useToasts from '@himalaya-ui/core/use-toasts';
import LoadingSpinner from '@himalaya-ui/core/loading-spinner';

type Inputs = {
  email: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  message: string;
  phone?: string;
};

export const ContactComponent = ({ lng }: { lng: string }) => {
  const theme = useTheme();
  const { t } = useTranslation(lng, 'contact');

  const [isLoading, setIsLoading] = useState(false);
  const { setToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to send email');

      setToast({
        text: t('form.success'),
        delay: 6000,
        type: 'success',
      });
      reset();
    } catch (error) {
      setToast({ text: t('form.error'), delay: 6000, type: 'error' });
    }
    setIsLoading(false);
  };

  return (
    <Section
      pb={{ xs: 5.57, lg: 0 }}
      pt={{ xs: 5.57, lg: 5.75 }}
      style={{
        background: theme.palette.background,
        color: theme.palette.foreground,
      }}
    >
      <PageWidth py={0}>
        <Grid.Container>
          <Grid justify="center" lg={14} md={16}>
            <EntryAnimation delay={0} duration={500}>
              <Text
                p={0}
                m={0}
                mb={5.75}
                font={{ xs: 2, md: 3.25 }}
                lineHeight={{ xs: 2.375, md: 3.375 }}
                style={{ fontWeight: 500 }}
              >
                {t('description')}
              </Text>
            </EntryAnimation>
          </Grid>
        </Grid.Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid.Container rowGap={4} gap={2}>
            <Grid justify="center" xs={24} md={12}>
              <Input
                r={0}
                clearable
                {...register('email', {
                  required: true,
                  disabled: isLoading,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email format',
                  },
                })}
                scale={1.5}
                placeholder={t('form.email')}
                w="100%"
              >
                {t('form.email')} <span className="reqiured">*</span>
              </Input>
            </Grid>
            <Grid justify="center" xs={24} md={12}>
              <Input
                r={0}
                clearable
                {...register('company', { disabled: isLoading })}
                scale={1.5}
                placeholder={t('form.company')}
                w="100%"
              >
                {t('form.company')}
              </Input>
            </Grid>
            <Grid justify="center" xs={24} md={8}>
              <Input
                r={0}
                clearable
                {...register('firstname', {
                  required: true,
                  disabled: isLoading,
                })}
                scale={1.5}
                placeholder={t('form.firstname')}
                w="100%"
              >
                {t('form.firstname')} <span className="reqiured">*</span>
              </Input>
            </Grid>
            <Grid justify="center" xs={24} md={8}>
              <Input
                r={0}
                clearable
                {...register('lastname', {
                  required: true,
                  disabled: isLoading,
                })}
                scale={1.5}
                placeholder={t('form.lastname')}
                w="100%"
              >
                {t('form.lastname')} <span className="reqiured">*</span>
              </Input>
            </Grid>{' '}
            <Grid justify="center" xs={24} md={8}>
              <Input
                r={0}
                clearable
                {...register('phone', { disabled: isLoading })}
                scale={1.5}
                placeholder={t('form.phone')}
                w="100%"
              >
                {t('form.phone')}
              </Input>
            </Grid>
            <Grid justify="center" xs={24} md={24}>
              <Textarea
                r={0}
                h={8}
                {...register('message', {
                  required: true,
                  disabled: isLoading,
                })}
                scale={1.5}
                placeholder={t('form.message')}
                w="100%"
              ></Textarea>
            </Grid>
            <Grid justify="flex-start" xs={24} md={24}>
              <Button
                disabled={!isValid || isLoading}
                type="primary"
                scale={1.2}
                auto
                effect
                pl={1}
                pr={1}
                icon={
                  isLoading ? (
                    <LoadingSpinner
                      w={3}
                      mr={0.5}
                      color={theme.palette.background}
                    />
                  ) : undefined
                }
                htmlType="submit"
              >
                {t('form.submit')}
              </Button>
            </Grid>
          </Grid.Container>
        </form>
      </PageWidth>
    </Section>
  );
};
