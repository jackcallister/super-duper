class Meal < ActiveRecord::Base
  has_many :ingredients, dependent: :destroy
  accepts_nested_attributes_for :ingredients
  validate :name, presence: true
end
