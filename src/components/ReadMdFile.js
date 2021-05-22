import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
//
import Markdown from './Markdown';

// ----------------------------------------------------------------------

const MarkdownWrapperStyle = styled('div')(({ theme }) => ({
  '& h1': {
    marginBottom: theme.spacing(5)
  },
  '& h2': {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2)
  },
  '& h3, h4, h5, h6': {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  '& img': {
    margin: theme.spacing(5, 0),
    boxShadow: theme.customShadows.z8,
    borderRadius: theme.shape.borderRadius
  },
  '& p': {
    marginBottom: theme.spacing(2)
  },
  '& ul': {
    margin: theme.spacing(2, 0)
  },
  '& pre': {
    margin: theme.spacing(3, 0)
  }
}));

// ----------------------------------------------------------------------

ReadMdFile.propTypes = {
  content: PropTypes.string
};

export default function ReadMdFile({ content, ...other }) {
  const [file, setFile] = useState('');

  const getFile = useCallback(async () => {
    fetch(content)
      .then((response) => response.text())
      .then((text) => {
        setFile(text);
      });
  }, [content]);

  useEffect(() => {
    getFile();
  }, [getFile]);

  return (
    <MarkdownWrapperStyle>
      <Markdown source={file} {...other} />
    </MarkdownWrapperStyle>
  );
}
