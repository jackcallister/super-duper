class Meal < ActiveRecord::Base
  belongs_to :user
  has_many :ingredients, dependent: :destroy

  accepts_nested_attributes_for :ingredients

  validate :name, :user, presence: true
end
