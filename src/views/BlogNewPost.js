import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
// material
import { Container, Card, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// utils
import { fData } from '../utils/formatNumber';
import fakeRequest from '../utils/fakeRequest';
// components
import Page from '../components/Page';
import HeaderDashboard from '../components/HeaderDashboard';
import { BlogNewPostPreview, BlogNewPostForm } from '../components/blog';

// ----------------------------------------------------------------------

const FILE_SIZE = 3145728; // bytes
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export default function BlogNewPost() {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
    cover: Yup.mixed()
      .required('Cover is required')
      .test(
        'fileSize',
        `File is larger than ${fData(FILE_SIZE)}`,
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        'fileFormat',
        'File type must be *.jpeg, *.jpg, *.png, *.gif',
        (value) => value && FILE_FORMATS.includes(value.type)
      )
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      content: '',
      cover: ''
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors({ afterSubmit: error.code });
      }
    }
  });

  return (
    <Page title="Blog: New Post | Minimal-UI">
      <Container>
        <HeaderDashboard
          heading="Create a new post"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: 'New Post' }
          ]}
        />

        <Card>
          <CardContent>
            <BlogNewPostForm
              formik={formik}
              onOpenPreview={handleOpenPreview}
            />
          </CardContent>
        </Card>

        <BlogNewPostPreview
          formik={formik}
          openPreview={open}
          onClosePreview={handleClosePreview}
        />
      </Container>
    </Page>
  );
}
