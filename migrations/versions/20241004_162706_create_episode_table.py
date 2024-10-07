"""create_episode_table

Revision ID: 7f52e29c2641
Revises: 8c94ef44f4ab
Create Date: 2024-10-04 16:27:06.472818

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7f52e29c2641'
down_revision = '8c94ef44f4ab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('episodes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('plot', sa.String(length=255), nullable=False),
    sa.Column('episodeNum', sa.Integer(), nullable=False),
    sa.Column('airDate', sa.DateTime(), nullable=False),
    sa.Column('previewImage', sa.String(), nullable=True),
    sa.Column('animeId', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['animeId'], ['anime.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('episodes')
    # ### end Alembic commands ###
