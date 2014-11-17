class Meal < ActiveRecord::Base
  has_many :ingredients
  accepts_nested_attributes_for :ingredients
  validate :name, presence: true
end
