import hljs from 'highlight.js';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

// ----------------------------------------------------------------------

const MarkdownWrapperStyle = styled('div')(({ theme }) => {
  const isLight = theme.palette.mode === 'light';

  return {
    '& h1': { ...theme.typography.h1 },
    '& h2': { ...theme.typography.h2 },
    '& h3': { ...theme.typography.h3 },
    '& h4': { ...theme.typography.h4 },
    '& h5': { ...theme.typography.h5 },
    '& h6': { ...theme.typography.h6 },

    // Paragraph
    '& p': {
      ...theme.typography.body1,
      lineHeight: 1.6
    },

    // Hr
    '& hr': {
      border: 'none',
      margin: theme.spacing(3, 0),
      borderTop: `1px solid ${theme.palette.divider}`
    },

    // List
    '& ul, & ol': {
      ...theme.typography.body1,
      paddingLeft: theme.spacing(5),
      '& li': {
        lineHeight: 2
      }
    },

    // Blockquote
    '& blockquote': {
      lineHeight: 1.5,
      fontSize: '1.5em',
      margin: '40px auto',
      position: 'relative',
      fontFamily: 'Georgia, serif',
      padding: theme.spacing(3, 3, 3, 8),
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor: theme.palette.background.neutral,
      color: `${theme.palette.text.secondary} !important`,
      [theme.breakpoints.up('md')]: {
        width: '80%'
      },
      '& p, & span': {
        marginBottom: '0 !important',
        fontSize: 'inherit !important',
        fontFamily: 'Georgia, serif !important',
        color: `${theme.palette.text.secondary} !important`
      },
      '&:before': {
        left: 16,
        top: -8,
        display: 'block',
        fontSize: '3em',
        content: '"\\201C"',
        position: 'absolute',
        color: theme.palette.text.disabled
      }
    },

    // Code Block
    '& pre, & pre > code': {
      fontSize: 16,
      overflowX: 'auto',
      whiteSpace: 'pre',
      padding: theme.spacing(2),
      color: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[isLight ? 900 : 500_16]
    },
    '& code': {
      fontSize: 14,
      borderRadius: 4,
      whiteSpace: 'pre',
      padding: theme.spacing(0.2, 0.5),
      color: theme.palette.warning[isLight ? 'darker' : 'lighter'],
      backgroundColor: theme.palette.warning[isLight ? 'lighter' : 'darker'],
      '&.hljs': { padding: 0, backgroundColor: 'transparent' }
    }
  };
});

// ----------------------------------------------------------------------

CodeBlock.propTypes = {
  value: PropTypes.string
};

function CodeBlock({ value }) {
  useEffect(() => {
    document.querySelectorAll('pre > code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [value]);

  return (
    <pre dir="ltr">
      <code>{value}</code>
    </pre>
  );
}

LinkTo.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node
};

function LinkTo({ href, children }) {
  const isHttp = href.includes('http');
  return (
    <Link href={href} target={isHttp ? '_blank' : '_self'}>
      {children}
    </Link>
  );
}

export default function Markdown({ ...other }) {
  return (
    <MarkdownWrapperStyle>
      <ReactMarkdown
        allowDangerousHtml
        renderers={{ code: CodeBlock, link: LinkTo }}
        {...other}
      />
    </MarkdownWrapperStyle>
  );
}
