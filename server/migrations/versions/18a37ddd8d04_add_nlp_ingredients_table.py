"""Add nlp ingredients table

Revision ID: 18a37ddd8d04
Revises: 22b69b64d241
Create Date: 2018-04-27 18:31:51.422335

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '18a37ddd8d04'
down_revision = '22b69b64d241'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('nlp_ingredient',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('original', sa.Text(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('quantity', sa.Float(), nullable=True),
    sa.Column('unit', sa.String(length=50), nullable=True),
    sa.Column('comment', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('nlp_ingredient')
    # ### end Alembic commands ###