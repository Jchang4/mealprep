"""Add tester1

Revision ID: 8fc8fad46bcb
Revises: 7fb050831deb
Create Date: 2018-04-27 18:15:05.801308

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8fc8fad46bcb'
down_revision = '7fb050831deb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('profile', sa.Column('tester1', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('profile', 'tester1')
    # ### end Alembic commands ###