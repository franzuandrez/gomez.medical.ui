import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
//
import { QuillEditor } from '../editor';
import { UploadSingleFile } from '../upload';

// ----------------------------------------------------------------------

BlogNewPostForm.propTypes = {
  formik: PropTypes.object.isRequired,
  onOpenPreview: PropTypes.func
};

export default function BlogNewPostForm({ formik, onOpenPreview }) {
  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Post Title"
          {...getFieldProps('title')}
          error={Boolean(touched.title && errors.title)}
          helperText={touched.title && errors.title}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={5}
          label="Description"
          {...getFieldProps('description')}
          error={Boolean(touched.description && errors.description)}
          helperText={touched.description && errors.description}
          sx={{ mb: 3 }}
        />

        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          Content
        </Typography>

        <QuillEditor
          id="post-content"
          value={values.content}
          onChange={(val) => setFieldValue('content', val)}
          error={Boolean(touched.content && errors.content)}
        />
        <FormHelperText error sx={{ px: 2 }}>
          {touched.content && errors.content}
        </FormHelperText>

        <Box sx={{ mb: 3 }} />

        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          Cover
        </Typography>
        <UploadSingleFile
          value={values.cover}
          onChange={(val) => setFieldValue('cover', val)}
          caption="(Only *.jpeg and *.png images will be accepted)"
          error={Boolean(touched.cover && errors.cover)}
        />
        <FormHelperText error sx={{ px: 2 }}>
          {touched.cover && errors.cover}
        </FormHelperText>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="button"
            color="inherit"
            variant="outlined"
            onClick={onOpenPreview}
            sx={{ mr: 1.5 }}
          >
            Preview
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            Post
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
