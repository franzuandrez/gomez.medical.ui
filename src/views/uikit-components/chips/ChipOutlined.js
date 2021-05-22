// material
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { Grid, Avatar, Chip } from '@material-ui/core';
// components
import Block from '../../../components/Block';
import { MChip } from '../../../components/@material-extend';

// ----------------------------------------------------------------------

export default function ChipOutlined() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Block title="Base">
          <Chip variant="outlined" label="Basic" />
          <Chip variant="outlined" label="Disabled" disabled />
          <Chip
            variant="outlined"
            avatar={<Avatar>B</Avatar>}
            label="Clickable"
            onClick={handleClick}
          />
          <Chip
            variant="outlined"
            avatar={
              <Avatar
                alt="Natacha"
                src="/static/mock-images/avatars/avatar_1.jpg"
              />
            }
            label="Deletable"
            onDelete={handleDelete}
          />
          <Chip
            variant="outlined"
            icon={<FaceIcon />}
            label="Clickable deletable"
            onClick={handleClick}
            onDelete={handleDelete}
          />
          <Chip
            variant="outlined"
            label="Custom delete icon"
            onClick={handleClick}
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />
          <Chip
            variant="outlined"
            label="Clickable Link"
            component="a"
            href="#chip"
            clickable
          />
          <Chip
            variant="outlined"
            avatar={<Avatar>M</Avatar>}
            label="Primary clickable"
            clickable
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />
          <Chip
            variant="outlined"
            icon={<FaceIcon />}
            label="Primary clickable"
            clickable
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />
          <Chip
            variant="outlined"
            label="Deletable primary"
            onDelete={handleDelete}
            color="primary"
          />
        </Block>
      </Grid>

      <Grid item xs={12}>
        <Block title="Colors">
          <MChip
            variant="outlined"
            label="Default deletable"
            avatar={
              <Avatar
                alt="Natacha"
                src="/static/mock-images/avatars/avatar_1.jpg"
              />
            }
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />

          <MChip
            variant="outlined"
            clickable
            label="Default clickable"
            avatar={
              <Avatar
                alt="Natacha"
                src="/static/mock-images/avatars/avatar_1.jpg"
              />
            }
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />

          <MChip
            variant="outlined"
            label="Primary deletable"
            avatar={
              <Avatar
                alt="Natacha"
                src="/static/mock-images/avatars/avatar_1.jpg"
              />
            }
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />

          <MChip
            variant="outlined"
            clickable
            label="Primary clickable"
            avatar={
              <Avatar
                alt="Natacha"
                src="/static/mock-images/avatars/avatar_1.jpg"
              />
            }
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />

          <MChip
            variant="outlined"
            icon={<FaceIcon />}
            label="Info deletable"
            onDelete={handleDelete}
            color="info"
            deleteIcon={<DoneIcon />}
          />

          <MChip
            variant="outlined"
            clickable
            icon={<FaceIcon />}
            label="Info clickable"
            onDelete={handleDelete}
            color="info"
            deleteIcon={<DoneIcon />}
          />

          <MChip
            variant="outlined"
            icon={<FaceIcon />}
            label="Success deletable"
            onDelete={handleDelete}
            color="success"
          />

          <MChip
            variant="outlined"
            clickable
            icon={<FaceIcon />}
            label="Success clickable"
            onDelete={handleDelete}
            color="success"
          />

          <MChip
            variant="outlined"
            icon={<FaceIcon />}
            label="Warning deletable"
            onDelete={handleDelete}
            color="warning"
          />

          <MChip
            variant="outlined"
            clickable
            icon={<FaceIcon />}
            label="Warning clickable"
            onDelete={handleDelete}
            color="warning"
          />

          <MChip
            variant="outlined"
            icon={<FaceIcon />}
            label="Error deletable"
            onDelete={handleDelete}
            color="error"
          />

          <MChip
            variant="outlined"
            clickable
            icon={<FaceIcon />}
            label="Error clickable"
            onDelete={handleDelete}
            color="error"
          />
        </Block>
      </Grid>

      <Grid item xs={12}>
        <Block title="Size">
          <MChip
            variant="outlined"
            avatar={<Avatar>M</Avatar>}
            label="Normal"
            onDelete={handleDelete}
            color="info"
          />

          <MChip
            variant="outlined"
            size="small"
            avatar={<Avatar>M</Avatar>}
            label="Small"
            onDelete={handleDelete}
            color="info"
          />
        </Block>
      </Grid>
    </Grid>
  );
}
