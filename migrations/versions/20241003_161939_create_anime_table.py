"""create_anime_table

Revision ID: 8c94ef44f4ab
Revises: 2a4c37356772
Create Date: 2024-10-03 16:19:39.054174

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c94ef44f4ab'
down_revision = '2a4c37356772'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('anime',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('synopsis', sa.String(length=255), nullable=False),
    sa.Column('numOfEpisode', sa.Integer(), nullable=False),
    sa.Column('hostEditorId', sa.Integer(), nullable=False),
    sa.Column('previewImage', sa.String(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['hostEditorId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('anime')
    # ### end Alembic commands ###
