"""create_genres_table

Revision ID: a69f505e9849
Revises: 447eee4762b7
Create Date: 2025-01-21 10:29:44.629538

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a69f505e9849'
down_revision = '447eee4762b7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('anime_genres',
    sa.Column('animeId', sa.Integer(), nullable=False),
    sa.Column('genreId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['animeId'], ['anime.id'], ),
    sa.ForeignKeyConstraint(['genreId'], ['genres.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('anime_genres')
    op.drop_table('genres')
    # ### end Alembic commands ###
