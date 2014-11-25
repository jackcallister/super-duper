class Meal < ActiveRecord::Base
  has_many :ingredients, dependent: :destroy
  belongs_to :user
  
  accepts_nested_attributes_for :ingredients
  
  validate :name, :user, presence: true
end
